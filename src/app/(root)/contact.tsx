"use client";
import { Button } from "@/components/ui/button";
import { TbMessageShare } from "react-icons/tb";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import emailjs from "@emailjs/browser";
import * as z from "zod";

import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { useForm } from "react-hook-form";
const formSchema = z
  .object({
    company: z.string().min(2, {
      message: "社名はフールネームで入力してください。",
    }),
    name: z.string().min(1, {
      message: "お名前の入力してください。",
    }),
    email: z.string().email({
      message: "正しいメールを入力してください。",
    }),
    message: z.string().min(10, {
      message: "問い合わせ内容が短すぎます。",
    }),
  })
  .required({
    name: true,
    email: true,
    message: true,
  });

export default function ContactSection() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { setActiveLink } = useNavigationStore();
  const { toast } = useToast();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#contact");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      name: "",
      email: "",
      message: "",
    },
  });
  const serviceID = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID || "";
  const templateID = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY || "";

  async function onSubmit() {
    await setIsDisabled(true);

    await emailjs
      .send(serviceID, templateID, form.getValues(), publicKey)
      .then(() => {
        toast({
          title: "メールを送信しました。",
          description:
            "自動送信メールが届かない場合はご利用中のメールサービスより再度転送するようお願いします。",
        });
        form.reset();
      })
      .catch((_) => {
        toast({
          variant: "destructive",
          title: "エラーが発生しました。",
          description:
            "メール送信に失敗しました。ご利用中のメールサービスでの送信または時間をおいて再度お試しください。",
        });
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  return (
    <section
      ref={targetRef}
      id="contact"
      className="flex flex-col items-center justify-center py-12"
    >
      <h3 className="mb-10 text-3xl font-medium text-primary">
        採用連絡
        <span className="rounded-sm bg-primary p-1 text-primary-foreground">
          大歓迎
        </span>
        します！
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-4 rounded-2xl bg-secondary p-4"
        >
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="j.l Company" {...field} />
                </FormControl>
                <FormDescription>社名を入力してください。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="j.lee" {...field} />
                </FormControl>
                <FormDescription>
                  お名前または担当者名を入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="artless1112@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  連絡用メールアドレスを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  問い合わせ内容を入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex  w-full justify-center border-t py-6">
            <Button type="submit" disabled={isDisabled}>
              <TbMessageShare className="mr-2" />
              連絡する
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
