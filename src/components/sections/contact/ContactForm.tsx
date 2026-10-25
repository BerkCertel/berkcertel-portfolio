"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Check, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendContact } from "@/actions/contact";
import { AppButton } from "@/components/common/AppButton";
import { AppCheckbox } from "@/components/common/AppCheckbox";
import { AppChip, ChipGroup } from "@/components/common/AppChip";
import { AppField } from "@/components/common/AppField";
import { AppInput } from "@/components/common/AppInput";
import { AppLink } from "@/components/common/AppLink";
import { AppSelect } from "@/components/common/AppSelect";
import { AppTextarea } from "@/components/common/AppTextarea";
import { CONTACT_LIMITS, CONTACT_SUBJECTS, CONTACT_TIMELINES } from "@/constants/contact";
import { SITE } from "@/constants/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { env } from "@/lib/env";
import { useTheme } from "@/providers/theme-provider";
import { contactSchema, type ContactErrorKey, type ContactInput } from "@/schemas/contact";

import { CONTACT_SENT_EVENT } from "./contact-events";

const DEFAULTS: ContactInput = {
  name: "",
  email: "",
  subject: CONTACT_SUBJECTS[0],
  timeline: CONTACT_TIMELINES[0],
  message: "",
  turnstileToken: "",
  consent: false,
  website: "",
};

/** Contact form card: validated with zod, sent through the `sendContact` Server Action. */
export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const { theme } = useTheme();
  const turnstileRef = useRef<TurnstileInstance>(undefined);
  // The flexible widget is at least 300px wide; very narrow screens get the compact one.
  const turnstileSize = useMediaQuery("(max-width: 359px)") ? "compact" : "flexible";
  const [sentName, setSentName] = useState<string | null>(null);
  const [serverError, setServerError] = useState<ContactErrorKey | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: DEFAULTS });

  // A new size re-creates the widget (see `key` below), so the previous token is no longer valid.
  useEffect(() => {
    setValue("turnstileToken", "");
  }, [turnstileSize, setValue]);

  /** Field error text: schema messages are keys of contact.errors. */
  const errorText = (key?: string) => (key ? t(`errors.${key as ContactErrorKey}`) : undefined);

  async function submit(data: ContactInput) {
    setServerError(null);
    const result = await sendContact(data, locale);
    // Turnstile tokens are single-use: get a fresh one for any next attempt.
    turnstileRef.current?.reset();
    setValue("turnstileToken", "");

    if (!result.ok) {
      setServerError(result.error);
      toast.error(t(`errors.${result.error}`));
      return;
    }
    setSentName(data.name);
    window.dispatchEvent(new Event(CONTACT_SENT_EVENT));
  }

  function startOver() {
    reset(DEFAULTS);
    setSentName(null);
  }

  return (
    <section
      aria-labelledby="contact-form-title"
      className="flex flex-col gap-[22px] rounded-3xl border border-line bg-surface p-9 max-[760px]:p-[22px]"
    >
      {sentName !== null ? (
        <div role="status" className="flex flex-col items-start gap-4 py-6">
          <span className="grid size-[52px] place-items-center rounded-[14px] bg-brand text-on-brand">
            <Check className="size-6" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <h2
            id="contact-form-title"
            className="font-display text-[44px] leading-[0.95] font-bold tracking-[-0.045em]"
          >
            {sentName ? t("success.titleWithName", { name: sentName }) : t("success.title")}
          </h2>
          <p className="text-subtle">{t("success.text")}</p>
          <AppButton variant="ghost" onClick={startOver}>
            {t("success.again")}
          </AppButton>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(event) => handleSubmit(submit)(event)}
          className="flex flex-col gap-[22px]"
        >
          <h2
            id="contact-form-title"
            className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.025em]"
          >
            {t("form.title")}
          </h2>

          {serverError && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {t(`errors.${serverError}`)}
            </p>
          )}

          <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
            <AppField label={t("form.name")} error={errorText(errors.name?.message)}>
              <AppInput
                autoComplete="name"
                placeholder={t("form.namePlaceholder")}
                maxLength={CONTACT_LIMITS.nameMax}
                {...register("name")}
              />
            </AppField>
            <AppField label={t("form.email")} error={errorText(errors.email?.message)}>
              <AppInput
                type="email"
                autoComplete="email"
                placeholder={t("form.emailPlaceholder")}
                {...register("email")}
              />
            </AppField>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs leading-none font-medium tracking-[0.06em] text-subtle uppercase">
              {t("form.subject")}
            </span>
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <ChipGroup label={t("form.subject")}>
                  {CONTACT_SUBJECTS.map((subject) => (
                    <AppChip
                      key={subject}
                      pressed={field.value === subject}
                      onClick={() => field.onChange(subject)}
                    >
                      {t(`form.subjects.${subject}`)}
                    </AppChip>
                  ))}
                </ChipGroup>
              )}
            />
          </div>

          <AppField label={t("form.timeline")}>
            <Controller
              control={control}
              name="timeline"
              render={({ field }) => (
                <AppSelect
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={CONTACT_TIMELINES.map((value) => ({
                    value,
                    label: t(`form.timelines.${value}`),
                  }))}
                />
              )}
            />
          </AppField>

          <AppField label={t("form.message")} error={errorText(errors.message?.message)}>
            <AppTextarea
              placeholder={t("form.messagePlaceholder")}
              maxLength={CONTACT_LIMITS.messageMax}
              {...register("message")}
            />
          </AppField>

          {/* Honeypot: invisible to people and assistive tech; bots tend to fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <AppInput tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div role="group" aria-label={t("form.spamProtection")} className="flex flex-col gap-2">
            {env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
              <Turnstile
                key={turnstileSize}
                ref={turnstileRef}
                siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                options={{ theme, language: locale, size: turnstileSize }}
                onSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
                onExpire={() => setValue("turnstileToken", "")}
                onError={() => setValue("turnstileToken", "")}
              />
            )}
            {errors.turnstileToken && (
              <p className="text-sm text-destructive">{errorText(errors.turnstileToken.message)}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {/* Notice (KVKK art. 10): information only, kept apart from the consent box. */}
            <p className="text-[12.5px] leading-[1.5] text-subtle">
              {t.rich("form.notice", {
                link: (chunks) => (
                  <AppLink
                    href="/privacy"
                    className="text-ink underline underline-offset-2 hover:text-brand"
                  >
                    {chunks}
                  </AppLink>
                ),
              })}
            </p>
            {/* Explicit consent (KVKK art. 9): only for the transfer abroad. */}
            <Controller
              control={control}
              name="consent"
              render={({ field }) => (
                <AppCheckbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  error={errorText(errors.consent?.message)}
                >
                  {t("form.consent")}
                </AppCheckbox>
              )}
            />
          </div>

          <div className="flex flex-col items-start gap-3">
            <AppButton
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              leftIcon={<Send strokeWidth={1.75} aria-hidden="true" />}
            >
              {isSubmitting ? t("form.sending") : t("form.submit")}
            </AppButton>
            <p className="text-[12.5px] leading-[1.5] text-subtle">
              {t.rich("form.noConsent", {
                email: SITE.email,
                mail: (chunks) => (
                  <AppLink
                    href={`mailto:${SITE.email}`}
                    className="text-ink underline underline-offset-2 hover:text-brand"
                  >
                    {chunks}
                  </AppLink>
                ),
              })}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
