import { Field } from "formik";

function UserInfo({ setSteps }) {
  return (
    <>
      <div>
        <Field type="text" name="firstName" placeholder="First Name" />
        <Field type="text" name="lastName" placeholder="Last Name" />
      </div>
    </>
  );
}
export default UserInfo;
