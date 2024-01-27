"use client";

import React, { use } from "react";
import Modal from "./Modal";
import useRentModel from "@/app/hooks/useRentModel";
import { useMemo } from "react";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModel from "@/app/hooks/useLoginModel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";

enum STEPS {
  LOCATION = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}
export default function RentModel() {
  const router = useRouter();
  const rentModel = useRentModel();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      monthCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const monthCount = watch("monthCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.LOCATION);
        rentModel.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Choose the Country!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setCustomValue("location", value)}
      />
      <div className="h-8"></div>
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="For how much time you want to give it for Rent?"
          subtitle="Choose the Contract Size (in Months)."
        />
        <Counter
          title="Months"
          subtitle="How Many?"
          value={monthCount}
          onChange={(value) => setCustomValue("monthCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a Photo of Your Hoarding"
          subtitle="Show Buyers what your Hoarding look like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Description."
          subtitle="Add Details about your Hoarding."
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, Set your Price"
          subtitle="How much  do you charge Monthly?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModel.isOpen}
      title="Add Your Hoardings!"
      actionLabel={actionLabel}
      SecondaryActionLabel={secondaryActionLabel}
      SecondaryActin={step === STEPS.LOCATION ? undefined : onBack}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

// const router = useRouter();
// const registerModel = useRegistrationModel();
// const loginModel = useLoginModel();
// const [isLoading, setIsLoading] = useState(false);

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm<FieldValues>({
//   defaultValues: {
//     email: "",
//     password: "",
//   },
// });

// const onSubmit: SubmitHandler<FieldValues> = (data) => {
//   setIsLoading(true);
//   // toast.success("Logged in");

//   signIn("credentials", {
//     ...data,
//     redirect: false,
//   }).then((callback) => {
//     setIsLoading(false);

//     if (callback?.ok) {
//       toast.success("Logged in");
//       router.refresh();
//       loginModel.onClose();
//     }

//     if (callback?.error) {
//       toast.error(callback.error);
//     }
//   });
// };

// const toggle = useCallback(() => {
//   loginModel.onClose();
//   registerModel.onOpen();
// }, [loginModel, registerModel]);

// const bodyContent = (
//   <div className="flex flex-col gap-4">
//     <Heading title="Welcome Back!" subtitle="Login to your account!" />
//     <Input
//       id="email"
//       label="Email"
//       disabled={isLoading}
//       register={register}
//       errors={errors}
//       required
//     />
//     <Input
//       id="password"
//       label="Password"
//       type="password"
//       disabled={isLoading}
//       register={register}
//       errors={errors}
//       required
//     />
//   </div>
// );

// const footerContent = (
//   <div className="flex flex-col gap-4 mt-3">
//     <hr />
//     <Button
//       outline
//       label="Continue With Google"
//       icon={FcGoogle}
//       onClick={() => {
//         signIn("google");
//       }}
//     />
//     <Button
//       outline
//       label="Continue With Github"
//       icon={AiFillGithub}
//       onClick={() => {
//         signIn("github");
//       }}
//     />
//     <div className="text-neutral-500 text-center mt-4 font-light">
//       <div className="justify-center flex flex-row items-center gap-2 ">
//         <div>First time using Hoardinger?</div>
//         <div
//           onClick={toggle}
//           className=" text-neutral-800 cursor-pointer hover:underline"
//         >
//           Create an account
//         </div>
//       </div>
//     </div>
//   </div>
// );
