import { Logo } from "@components/shared";
import { Button } from "@components/ui";
import { useUser } from "@hooks";
import { userApi } from "@store/services/user";
import { UserDetails as Details } from "@store/types/auth";
import { Form, Formik, FormikHelpers } from "formik";
import { ProfileAdd } from "iconsax-react";
import { RefObject, useRef } from "react";
import { useNavigate } from "react-router";

const initialState: Details = {
  first_name: "",
  last_name: "",
  headline: "",
  about: "",
  profile_pic:
    "https://github.com/Sayantan-s/portfolio_22/blob/main/public/me/face.png",
  profile_links: {
    linkedin: "https://www.linkedin.com/in/sayantan-s-554bb117a/",
    dribble: "https://dribbble.com/SaySaam",
    website: "https://portfolio-22-smoky.vercel.app/",
  },
};

export const UserDetails = () => {
  const ref = useRef() as RefObject<HTMLInputElement>;
  const [updateUser, { isLoading }] = userApi.useUpdateUserDetailsMutation();
  const user = useUser();
  const navigate = useNavigate();

  const onHandleOpenFile: React.MouseEventHandler<HTMLDivElement> = (eve) => {
    eve.preventDefault();
    ref.current?.click();
  };

  const onSubmit = async (values: Details, actions: FormikHelpers<Details>) => {
    try {
      await updateUser({
        details: values,
        userId: user?.id!,
      }).unwrap();
      await actions.resetForm();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Formik initialValues={initialState} onSubmit={onSubmit}>
        {({ handleChange }) => (
          <Form className="space-y-4 w-full max-w-xl bg-white shadow-xl shadow-slate-400/20 px-8 py-10 rounded-xl">
            <Logo />
            <div className="mx-auto w-max">
              <input type="file" name={"file"} className="hidden" ref={ref} />
              <div
                className="bg-slate-400/20 w-max p-2 rounded-full"
                onClick={onHandleOpenFile}
              >
                <ProfileAdd variant="Bulk" className="w-12 h-12" />
              </div>
            </div>
            <div className="flex space-x-4 w-full">
              <input
                type="text"
                placeholder="eg.John"
                name={"first_name"}
                className="w-full border border-slate-100 focus:border-slate-200 py-4 px-3 rounded-xl outline-none"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="eg.Doe"
                name={"last_name"}
                className="w-full border border-slate-100 focus:border-slate-200 py-4 px-3 rounded-xl outline-none"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <textarea
                className="resize-none border border-slate-100 focus:border-slate-200 py-3 px-2 rounded-xl outline-none"
                placeholder="Keep it short and nice!"
                name="headline"
                onChange={handleChange}
              />
              <textarea
                className="resize-none border border-slate-100 focus:border-slate-200 py-3 px-2 rounded-xl outline-none"
                placeholder="A brief intro about yourself!"
                name="about"
                rows={4}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <Button variant={"gradient"} size="lg" disabled={isLoading}>
                Shoot
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
