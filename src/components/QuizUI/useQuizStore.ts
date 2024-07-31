// TODO: Delete the following file

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

type ChallengeState = {
  isCorrect: boolean;
  showHint: number | undefined;
  showExplanation: boolean | undefined;
  
};

export type QuizStore = {
  totalQuestions: number;
  correctAnswers: number;
  setTotalQuestions: (totalQuestions: number) => void;
  setCorrectAnswers: (correctAnswers: number) => void;

  challenges: Record<string, ChallengeState>;
  tryAnswer: (titleKey: string, isCorrect: boolean) => void;
  showHint: (titleKey: string) => void;
  nextHint: (titleKey: string) => void;
  hideHint: (titleKey: string) => void;
  toggleExplanation: (titleKey: string) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set) => ({
        challenges: {},
        correctAnswers: 0,
        totalQuestions: 0,


        setTotalQuestions: (totalQuestions) => set({ totalQuestions }),
        setCorrectAnswers: (correctAnswers) => set({ correctAnswers }),

        reset: () =>
          set((state) => ({
            correctAnswers: 0,
            challenges: Object.keys(state.challenges).reduce(
              (acc, key) => ({
                ...acc,
                [key]: {
                  isCorrect: false,
                  showHint: undefined,
                  showExplanation: undefined,
                },
              }),
              {}
            ),
          })),
        tryAnswer: (titleKey, isCorrect) =>
          set((state) => ({
            challenges: {
              ...state.challenges,
              [titleKey]: {
                isCorrect,
                showHint: state.challenges[titleKey]?.showHint,
                showExplanation: state.challenges[titleKey]?.showExplanation,
              },
            },
          })),
        showHint: (titleKey) =>
          set((state) => ({
            challenges: {
              ...state.challenges,
              [titleKey]: {
                isCorrect: state.challenges[titleKey]?.isCorrect,
                showHint: state.challenges[titleKey]?.showHint
                  ? state.challenges[titleKey]?.showHint + 1
                  : 1,
                showExplanation: state.challenges[titleKey]?.showExplanation,
              },
            },
          })),
        nextHint: (titleKey) =>
          set((state) => ({
            challenges: {
              ...state.challenges,
              [titleKey]: {
                isCorrect: state.challenges[titleKey]?.isCorrect,
                showHint: state.challenges[titleKey]?.showHint
                  ? state.challenges[titleKey]?.showHint + 1
                  : 1,
                showExplanation: state.challenges[titleKey]?.showExplanation,
              },
            },
          })),
        hideHint: (titleKey) =>
          set((state) => ({
            challenges: {
              ...state.challenges,
              [titleKey]: {
                isCorrect: state.challenges[titleKey]?.isCorrect,
                showHint: undefined,
                showExplanation: state.challenges[titleKey]?.showExplanation,
              },
            },
          })),
        toggleExplanation: (titleKey) =>
          set((state) => ({
            challenges: {
              ...state.challenges,
              [titleKey]: {
                isCorrect: state.challenges[titleKey]?.isCorrect,
                showHint: state.challenges[titleKey]?.showHint,
                showExplanation: !state.challenges[titleKey]?.showExplanation,
              },
            },
          })),
      }),
      {
        name: "quiz-storage",
      }
    )
  )
);
