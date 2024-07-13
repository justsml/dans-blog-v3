import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet, { WithStyles } from "react-jss";
import Challenge from "./";
import { isHtml, stripHtml, removeBySelector, extractTagContent } from "../../utils/shared.js";
import Score from "./Score.jsx";
import { retryApp } from "../../utils/helpers.js";

/* eslint-disable n./Score.jsscore-dangle */
/* eslint-disable no-param-reassign */
// import { delay } from "functional-promises";
// import ScrollAnimation from "react-animate-on-scroll";
/*
EXAMPLE CHALLENGE DEFINITION:

<section className="challenge" group="Definitions" title="Question #1: Meaning of life:">
  <h2 className="description">What is the meaning of life?</h2>
  <legend className="hint"><i>Do great good; it will be revealed</i> - dan levy</hint>
  <ul className="options">
    <li>1</li>
    <li>2</li>
    <li className="answer">42</li>
    <li>3</li>
  </ul>
  <div className="explanation">Overview & more resources</div>
</section>
*/

const styles = (theme: any) => ({
  autoloader: {
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "99vw",
      margin: "0 -1.4rem",
      "& .gatsby-highlight": {
        margin: "0 -2.1rem"
      }
    }
  }
});

interface AutoLoaderProps extends WithStyles<typeof styles> {}

interface AutoLoaderState {
  score: { totalAvailable: number; current: number };
  loaded: boolean;
  challenges: any[];
}

class AutoLoader extends Component<AutoLoaderProps, AutoLoaderState> {
  state: AutoLoaderState = {
    score: { totalAvailable: -1, current: 0 },
    loaded: false,
    challenges: []
  };

  componentDidMount(): void {
    // check the DOM for static data to extract
    retryApp(this.checkInlineChallenges, { limit: 8, delayMsec: 125 });
    this.__mounted = true;
  }

  componentWillUnmount(): void {
    this.__mounted = false;
    clearTimeout(this.loadTimeout);
  }

  shouldComponentUpdate(nextProps: AutoLoaderProps, nextState: AutoLoaderState): boolean {
    const challenges = this.getChallenges();
    const getTitles = (cs: any[]): string[] => cs.map(c => c.title);

    this.resetLoadingSpinner();

    if (getTitles(challenges).join(",") === getTitles(nextState.challenges).join(",")) return false;

    return true;
  }

  resetLoadingSpinner(): void {
    const challengeUiCards = document.querySelectorAll(".challenge-ui");
    if (!challengeUiCards) return;
    const quizReadyUi = document.querySelector(".quiz-ready");
    const quizLoadingUi = document.querySelector(".quiz-loading");
    if (quizReadyUi && quizLoadingUi) {
      quizReadyUi.style.display = "block";
      quizLoadingUi.style.display = "none";
    }
  }

  loadChallenges(challengeConfigs: any[]): void {
    this.setState(
      {
        challenges: challengeConfigs,
        score: { ...this.state.score, totalAvailable: challengeConfigs.length }
      },
      () => {
        this.forceUpdate();
        this.resetLoadingSpinner();
      }
    );
  }

  getChallenges(): any[] {
    if (!this.__mounted) {
      console.warn("Short circuit Statful Work when UNMOUNTED!");
      return [];
    }
    const challenges = Array.from(window.document.querySelectorAll(".challenge"));
    if (challenges.length <= 0) return [];

    // console.log("challenges", challenges);

    const challengeConfigs = challenges.map(c => {
      const config = {
        title: c.title || this.getContent(c, ".title"),
        answer: this.getContent(c, ".answer"),
        description: this.getContent(c, ".description"),
        explanation: this.getContent(c, ".explanation"),
        hint: this.getContent(c, ".hint"),
        options: !c.querySelectorAll
          ? []
          : Array.from(c.querySelectorAll(".options > *")).map(li => li.textContent)
      };
      // Check for in-line overides before going any further
      const overrides = this.checkContentForMetadata(config);

      // console.log(`Overrides:`, overrides);
      return Object.assign({}, config, overrides);
      // return <Challenge key={config.title} {...config} />
    });

    // console.log("config", JSON.stringify(challengeConfigs));
    return challengeConfigs;
  }

  onAnswer = ({ correct, value }: { correct: boolean; value: any }): void => {
    let current = this.state.score.current;
    if (correct) {
      current++;
    }
    this.setState({
      ...this.state,
      score: { totalAvailable: this.state.challenges.length, current }
    });
  };

  resetScores = (): void => {
    this.setState({
      ...this.state,
      score: { totalAvailable: this.state.challenges.length, current: 0 }
    });
  };

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={"challenges-autoloader " + classes.autoloader}></div>
        {this.state.challenges.map((config, i) => {
          return (
            <Challenge
              key={`${i + 1}-${config.title}`}
              number={i + 1}
              {...config}
              onAnswer={this.onAnswer}
              reset={this.resetScores}
            />
          );
        })}
        {this.state.challenges.length > 0 && (
          <Score
            reset={this.resetScores}
            totalAvailable={this.state.score.totalAvailable}
            score={this.state.score.current}
          />
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(AutoLoader);
