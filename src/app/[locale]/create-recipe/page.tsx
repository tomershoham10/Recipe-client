"use client";
import Dropdown, { DropdownSizes } from "@/components/Dropdown/page";
import Input, { InputTypes } from "@/components/Input/page";
import Textbox, { FontSizes } from "@/components/Textbox/page";
import { pick } from "lodash";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

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
      <div className="flex flex-col w-[20rem]">
        <p className="text-2xl font-semibold">{t("addRecipeName")}:</p>
        <Input
          type={InputTypes.text}
          value={undefined}
          onChange={(e) => console.log(e)}
        />
      </div>
      <div className="flex flex-col w-[40rem] h-[8rem]">
        <p className="text-2xl font-semibold">{t("addRecipeDescription")}:</p>
        <Textbox
          isEditMode={false}
          fontSizeProps={FontSizes.SMALL}
          value={undefined}
          onChange={(e) => console.log(e)}
        />
      </div>
      <div className="w-[20rem]">
        <p className="text-2xl font-semibold">{t("chooseRecipeCategory")}:</p>
        <Dropdown
          isSearchable={false}
          placeholder={""}
          items={[]}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          size={DropdownSizes.SMALL}
        />
      </div>
      <p className="text-2xl font-semibold">{t("addRecipeIngredients")}:</p>
      <p className="text-2xl font-semibold">{t("uploadRecipePictue")}:</p>
      {/* </NextIntlClientProvider> */}
    </>
  );
}
