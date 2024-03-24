"use client";
import Input, { InputTypes } from "@/components/Input/page";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";

export default function Index() {
  const messages = useMessages();
  const t = useTranslations("createRecipe");
  return (
    <>
      {/* <NextIntlClientProvider
        messages={
          // … and provide the relevant messages
          pick(messages, "ClientCounter")
        }
      > */}
        <p className="text-5xl font-bold">{t("createRecipe")}:</p>
        <div>
          <p className="text-2xl font-semibold">{t("addRecipeName")}:</p>
          <Input
            type={InputTypes.text}
            value={undefined}
            onChange={(e) => console.log(e)}
          />
        </div>
        <p className="text-2xl font-semibold">{t("addRecipeDescription")}:</p>
        <p className="text-2xl font-semibold">{t("chooseRecipeCategory")}:</p>
        <p className="text-2xl font-semibold">{t("uploadRecipePictue")}:</p>
        <p className="text-2xl font-semibold">{t("addRecipeIngredients")}:</p>
      {/* </NextIntlClientProvider> */}
    </>
  );
}
