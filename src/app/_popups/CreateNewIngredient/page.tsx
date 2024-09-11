"use client";
import { useReducer } from "react";
import Input, { InputTypes } from "@/components/Input/page";
import useStore from "@/app/store/useStore";
import { PopupsTypes, usePopupStore } from "@/app/store/stores/usePopupStore";
import { createIngredient } from "@/app/API/recipe-service/functions";
import {
  newIngredientAction,
  newIngredientReducer,
} from "@/reducers/popups/createIngredientReducer";
import { useTranslations } from "next-intl";
import Dropdown, { DropdownSizes } from "@/components/Dropdown/page";
import { FaXmark } from "react-icons/fa6";

const CreateNewIngredient: React.FC = () => {
  const tIng = useTranslations("createIngredient");
  const tButtons = useTranslations("buttons");
  const selectedPopup = useStore(usePopupStore, (state) => state.selectedPopup);
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const initialIngredientState = {
    name: undefined,
    averagedPrice: 0,
    categories: [],
    whereToFind: [],
  };

  const [newIngredientState, newIngredientDispatch] = useReducer(
    newIngredientReducer,
    initialIngredientState
  );

  const createCourseHandle = async (courseName: string) => {
    try {
      console.log("create course:", courseName);
      const response = await createIngredient(courseName);
      console.log("create course - response:", response);
      if (response === 201) {
        alert("created");
      }
      if (response === 500 || response === null) {
        alert("Error while creating the course! please try again");
      }
      if (response === 403) {
        alert("Course already existed!");
      }
    } catch (error) {
      alert(`error while creating course: ${error}`);
      throw new Error(`error while creating course: ${error}`);
    }
  };

  return (
    <div
      className={
        selectedPopup === PopupsTypes.NEW_INGREDIENT
          ? "fixed z-20 flex h-full w-full items-center justify-center overflow-auto bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)] transition duration-200 ease-out"
          : "z-0 opacity-0 transition duration-200 ease-in"
      }
    >
      {selectedPopup === PopupsTypes.NEW_INGREDIENT ? (
        <div
          className="flex h-[18rem] w-fit 
        rounded-md bg-white px-5 py-5 dark:border-2 dark:border-duoGrayDark-light dark:bg-duoGrayDark-darkest"
        >
          <button
            onClick={() => {
              updateSelectedPopup(PopupsTypes.CLOSED);
            }}
            className="h-fit w-fit flex-none rounded-md text-duoGray-dark dark:text-duoBlueDark-text"
          >
            <FaXmark />
          </button>
          <div
            className="ml-[0.5rem] mr-6 grid w-[30rem] flex-none 
          grid-cols-4 grid-rows-3 flex-col items-center justify-center"
          >
            <p className=" col-span-4 flex flex-none items-center justify-center text-2xl font-extrabold text-duoGray-darkest dark:text-duoGrayDark-lightest">
              {tIng("createIngredient")}
            </p>

            <div>
              <p className="col-span-1 flex-none text-lg font-bold text-duoGray-darkest dark:text-duoGrayDark-lightest">
                {tIng("ingredientName")}
              </p>

              <div className="col-span-3 mx-4 flex flex-none flex-col items-center justify-center">
                <Input
                  type={InputTypes.text}
                  placeholder={"Course Name"}
                  value={newIngredientState.name}
                  onChange={(value: string) =>
                    newIngredientDispatch({
                      type: newIngredientAction.SET_INGREDIENT_NAME,
                      payload: value,
                    })
                  }
                  // failed={isFailed ? true : false}
                />
              </div>
            </div>

            <div>
              <p className="col-span-1 flex-none text-lg font-bold text-duoGray-darkest dark:text-duoGrayDark-lightest">
                {tIng("addPrice")}
              </p>

              <div className="col-span-3 mx-4 flex flex-none flex-col items-center justify-center">
                <Input
                  type={InputTypes.text}
                  placeholder={"Course Name"}
                  value={newIngredientState.name}
                  onChange={(value: string) =>
                    newIngredientDispatch({
                      type: newIngredientAction.SET_INGREDIENT_NAME,
                      payload: value,
                    })
                  }
                  // failed={isFailed ? true : false}
                />
              </div>
            </div>

            <div>
              <p className="col-span-1 flex-none text-lg font-bold text-duoGray-darkest dark:text-duoGrayDark-lightest">
                {tIng("addCategory")}
              </p>

              <div className="col-span-3 mx-4 flex flex-none flex-col items-center justify-center">
                <Dropdown
                  isSearchable={false}
                  placeholder={""}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </div>
            </div>
            <div className="col-span-2 col-start-2 mt-2 flex-none justify-center">
              {tButtons("create")}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateNewIngredient;
