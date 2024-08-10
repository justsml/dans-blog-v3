"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import { RefreshCcwIcon } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

export function ContactForm({
  reCaptchaSiteKey,
}: {
  reCaptchaSiteKey?: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Successfully submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Sent!</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
      name="contact"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mt-10 mx-auto contact-form"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"    
      >
        <input type="hidden" name="form-name" value="contact" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem style={{ gridColumn: "span 2" }}>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="loading-message">
          <RefreshCcwIcon />
        </div>

        <div id="recaptcha" data-recaptcha-site-key={reCaptchaSiteKey}></div>

        <Button type="submit" variant="default">Send</Button>

        <input type="hidden" name="g-recaptcha-response" />

        <aside className="success-message">
          <p>Thanks for reaching out!</p>
        </aside>
        <aside className="error-message">
          <p>
            There was an error sending your message. Please check the form and try again.
          </p>
        </aside>
      </form>
    </Form>
  );
}
