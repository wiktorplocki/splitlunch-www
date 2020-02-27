import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Button, DateTimePicker } from "react-rainbow-components";
import {
  PageForm,
  Header,
  InputsContainer,
  StyledCard
} from "../+Components/StyledComponents";
import { Input, Layout, TextArea } from "../../components";

import NewOrderMutation from "../../graphql/NewOrderMutation";

const NewOrderPage = () => {
  const { handleSubmit, control, register } = useForm();
  const [createOrder, { error }] = useMutation(NewOrderMutation);
  const history = useHistory();

  const onSubmit = async ({ name, description, date }) => {
    const { data } = await createOrder({
      variables: { order: { name, description, date } }
    });
    const { _id } = data.createOrder;
    history.push(`/orders/${_id}`);
  };

  return (
    <PageForm onSubmit={handleSubmit(onSubmit)} react-data="newOrder">
      <Layout.Flex fullScreen direction="column">
        <Header>Create New Order</Header>
        <StyledCard>
          <InputsContainer>
            <Input
              label="Order Name"
              name="name"
              required
              ref={register}
              error={error && error.message}
            />
            <TextArea
              label="Order Description"
              name="description"
              ref={register}
              error={error && error.message}
            />
            <Controller
              as={
                <DateTimePicker
                  label="Pick a date"
                  required
                  error={error && error.message}
                />
              }
              control={control}
              name="date"
            />
            <Button variant="brand" label="Create" type="submit" />
          </InputsContainer>
        </StyledCard>
      </Layout.Flex>
    </PageForm>
  );
};

export default NewOrderPage;
