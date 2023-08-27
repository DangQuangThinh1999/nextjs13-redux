import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IProductCreate } from "../../types";

import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { postProduct } from "../../../app/api/getProducts";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
const CreateForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IProductCreate>({
    criteriaMode: "all",
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { tokenAuth } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: IProductCreate) => {
    const body = {
      ...data,
      price: +data.price,
      images: [data.images],
    };

    try {
      setIsLoading(true);
      await postProduct(body, tokenAuth);
      enqueueSnackbar(`Product ${data.name} is created successfully`, {
        variant: "success",
      });
      reset({
        name: "",
        description: "",
        price: 0,
        images: "",
      });
      setIsLoading(false);

      // You can handle the response data here
    } catch (error) {
      setError(true);
      setIsLoading(false);
      // Handle the error here
    }
  };
  return (
    <form
      className="bg-white wrapperError flex flex-col space-y-3 top-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <div className="text-[#d00000] mb-1">
          Invalid Creation Information !
        </div>
      )}
      <label> Name Product :</label>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <input
          className="pl-2 outline-none border-none w-full"
          type="text"
          placeholder="Username"
          {...register("name", {
            required: "This input is required.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <label> Price :</label>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <input
          className="pl-2 outline-none border-none  w-full"
          type="text"
          placeholder="Price"
          {...register("price", {
            required: "This input is required.",
            pattern: {
              value: /^-?\d*$/,
              message: "This input is number.",
            },
            maxLength: {
              value: 7,
              message: "Input max 7 characters",
            },
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="price"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />

      <label> Description :</label>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <input
          className="pl-2 outline-none border-none  w-full"
          type="text"
          placeholder="Description"
          {...register("description", {
            required: "This input is required.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <label> Images :</label>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <input
          className="pl-2 outline-none border-none  w-full"
          type="text"
          placeholder="Link http image to input"
          {...register("images", {
            required: "This input is required.",
            pattern: {
              value: /^(http:\/\/|https:\/\/)/i,
              message: "This input is http.",
            },
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="images"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <button
        type="submit"
        className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
            <div>Loading...</div>
          </div>
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default CreateForm;
