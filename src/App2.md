/_ eslint-disable no-unused-vars _/
import "./App.css";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Redirect, Switch, Route } from "react-router";
import UserInfo from "./Components/UserInfo";
import SchoolDetail from "./Components/SchoolDetail";
import Contact from "./Components/Contact";
import { useHistory } from "react-router-dom";
import { studentPath } from "./Paths";

function App() {
let history = useHistory();
const [steps, setSteps] = useState(studentPath);
const [activeStep, setActiveStep] = React.useState(0);

const next = () => {
let routeTo = steps[activeStep + 1];
setActiveStep(activeStep + 1);
history.push(`/form/${routeTo}`);
};

const handleSubmit = async (values, bag) => {
if (activeStep + 1 === steps.length) {
// submit form
window.confirm(JSON.stringify(values, null, 2));
} else {
bag.setTouched({});
next();
}
};

return (
<div className="App">
<Formik
initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          schoolName: "",
          schoolAddress: "",
        }}
onSubmit={handleSubmit} >
{({ values, isValid }) => (
<Form>
<div className="container">
<div className="form">
<Switch>
<Redirect from="/" exact to={`/form/user-info`} />

                  <Route path="/form/user-info" component={UserInfo} />
                  <Route path="/form/school-info" component={SchoolDetail} />
                  <Route path="/form/contact" component={Contact} />
                </Switch>
                <div>
                  <button type="submit" disabled={!isValid}>
                    {activeStep + 1 === steps.length ? "submit" : "next"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>

);
}

export default App;
