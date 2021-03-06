import { Formik, FormikHelpers, Form } from "formik";
import { Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "./../components/InputField";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import ShowImage from "../components/ShowImage";
interface inputType {
  clientId: string;
  details: string;
  state: string;
  largeImageKey?: string;
  smallImageKey?: string;
  largeImageText?: string;
  smallImageText?: string;
}
const Index = () => {
  const [isTurnOn, setIsTurnOn] = useState(false);
  const initialValues: inputType = {
    clientId: "",
    details: "",
    state: "",
    largeImageKey: "",
    smallImageKey: "",
    largeImageText: "",
    smallImageText: "",
  };
  const onSubmit = (
    values: inputType,
    formikHelpers: FormikHelpers<inputType>
  ) => {
    console.log(values);
    if (isTurnOn) {
      if (values.clientId === "") {
        formikHelpers.setErrors({
          clientId: "clientId is required",
        });
        return;
      }
      global.ipcRenderer.send("stopSet", values);
      setIsTurnOn(false);
    } else {
      if (values.clientId === "") {
        formikHelpers.setFieldError("clientId", "clientId is required");
        return;
      }
      if (values.details === "") {
        formikHelpers.setFieldError("details", "details is required");
        return;
      }
      if (values.state == "") {
        formikHelpers.setFieldError("state", "state is required");
        return;
      }
      if (values.largeImageKey == "") {
        values.largeImageKey = undefined;
      }
      if (values.smallImageKey == "") {
        values.smallImageKey = values.largeImageKey;
      }

      global.ipcRenderer.send("startSet", values);
      setIsTurnOn(true);
      return;
    }
  };
  const onClickToP = (e) => {
    window.open("https://github.com/tritranduc");
  };
  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            {/* {JSON.stringify(values)} */}
            <Grid templateColumns="repeat(3, 1fr)" gap={3} mb={10}>
              <GridItem w="100%" h="90">
                <InputField
                  label="client-id"
                  name="clientId"
                  placeholder="type your client id"
                  type="password"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="t???a ????? c???a c??ng vi???c"
                  name="details"
                  placeholder="vi???t t???a ????? c???a c??ng vi???c v??o ??i"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="m?? t??? th??m cho c??ng vi???c"
                  name="state"
                  placeholder="vi???t m?? t??? th??m cho c??ng vi???c v??o ??i"
                />
              </GridItem>

              <GridItem w="100%" h="90">
                <InputField
                  label="small Image ????? tr???ng n???u kh??ng d??ng"
                  name="smallImageKey"
                  placeholder="d??n url h??nh ???nh ( c??i h??nh nh??? ) v??o ??i"
                />
                {/* <ShowImage src={values.smallImageKey} /> */}
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="smallImageText ????? tr???ng n???u kh??ng d??ng"
                  name="smallImageText"
                  placeholder="d??n text ( cho c??i h??nh nh??? v??o ??i ) v??o ??i"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="largeImageText ????? tr???ng n???u kh??ng d??ng"
                  name="largeImageText"
                  placeholder="d??n text (cho c??i h??nh to v??o ??i) v??o ??i"
                />
              </GridItem>

              <GridItem w="100%" h="90">
                <InputField
                  label="large Image l??u ?? h??nh c???n ph???i l???n tr??n 512x512 ????? tr???ng n???u kh??ng d??ng"
                  name="largeImageKey"
                  placeholder="d??n url h??nh ???nh (c??i h??nh to) v??o ??i l??u ?? h??nh c???n ph???i l???n tr??n 512x512"
                />
                {/* <ShowImage src={values.largeImageKey} /> */}
              </GridItem>
            </Grid>
            <Button type="submit" colorScheme="teal" mt={4}>
              {isTurnOn ? "stop" : "start"}
            </Button>
          </Form>
        )}
      </Formik>
      {/* create by */}
      <p style={{ display: "flex" , margin : "1px"}}>
        ???????c l??m b???i{" "}
        <p onClick={onClickToP} style={{ cursor: "pointer", color: "blue" }}>
          ai ???? tr??n m???ng
        </p>
      </p>
    </Wrapper>
  );
};
export default Index;
