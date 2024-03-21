"use client";
import Input, { InputTypes } from "@/components/Input/page";
import Textbox, { FontSizes } from "@/components/Textbox/page";
import React from "react";

const createRecipe = () => {
  return (
    <div>
      <h1 className="font-extrabold text-4xl">Create Recipe</h1>
      <p>name</p>
      <Input
        type={InputTypes.text}
        value={"name"}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <p>categories</p>
      <p>diffculty level</p>
      <p>description</p>
      <Textbox
        isEditMode={false}
        fontSizeProps={FontSizes.MEDIUM}
        value={"description"}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <p>img</p>
      <p>quantifiedIngredients</p>
    </div>
  );
};

export default createRecipe;
