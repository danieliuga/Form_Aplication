import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { Form } from '../../components/Form/Form'

export const formulario = ({
    given: Given,
    and: And,
    when: When,
    then: Then
}) => {
    Given('the user open a simple form', () => {
        render(<Form />)
    });

    Given(/^you write "(.*)" in "(.*)"$/, (text, textBox) => {
        fireEvent.change(screen.getByTestId(textBox), { target: { value: text } });
    });

    Given(/^you press the "(.*)" button$/, (buttonName) => {
        const button = screen.getByTestId(buttonName);
        fireEvent.click(button);
    });

    //Nuevo funciona
    Given(/^you write nothing in "(.*)"$/, async (nullValue) => {
        const element = screen.getByTestId(nullValue);
        userEvent.clear(element);
        await userEvent.type(element, 'test');
        userEvent.clear(element);
    });

    //nuevo funciona
    When(/^the user enters "(.*)" on "(.*)"$/, async (value, input) => {
        const inputField = screen.getByTestId(input);
        await userEvent.type(inputField, value);
    });

    //Nuevo
    When(/^the user presses the "(.*)" button$/, (buttonName) => {
        const button = screen.getByTestId(buttonName);
        fireEvent.click(button);
    });

    Then('I should see the formulario', () => {
        var isRendered = false;
        if (screen.getByTestId('formulario')) isRendered = true;
        expect(isRendered).toBe(true)
    });

    Then(/^I should see "(.*)" in "(.*)"$/, (text, textBox) => {
        var theValue = false
        console.log(screen.getByTestId(textBox).value, text);
        if (screen.getByTestId(textBox).value == text) theValue = true;
        expect(theValue).toBe(true)
    });

    Then(/^I should see nothing in "(.*)"$/, (nullValue) => {
        const element = screen.getByTestId(nullValue);
        expect(element).toBeInTheDocument();
        expect(element.value).toBe('');
    });
    //Nuevo funciona
    Then(/^I should see "(.*)" error in input "(.*)"$/, (error, id) => {
        const element = screen.getByTestId(id);
        expect(element).toBeInTheDocument();
        expect(element.innerHTML).toBe(error);
    });

    //Nuevo
    Then(/^I should see "(.*)" error in the input "(.*)"$/, (error, id) => {
        const element = screen.getByTestId(id);
        expect(element).toBeInTheDocument();
        expect(element.value).toBe(error.value);
    });

    //nuevo funciona
    Then(/^the "(.*)" should show no message error$/, () => {
        const countryField = screen.getByTestId("countryButton");
        const idField = screen.getByTestId("dni");
        const country = countryField.value.toUpperCase();
        const id = idField.value;
        if (country === "España") {
            expect(id).toMatch(/^[0-9]{8}[A-HJ-NP-TV-Z]$/);
        } else if (country === "Argentina") {
            expect(id).toMatch(/^[0-9]{8}$/);
        } else {
            expect(true).toBe(true);
        }
    });

    // Given(/^you select "(.*)" in "(.*)"$/, (text, textBox) => {
    //     fireEvent.change(screen.getByTestId(textBox), { target: { value: text } });
    // });

    // When(/^you write "(.*)" in "(.*)"$/, (text, textBox) => {
    //     fireEvent.change(screen.getByTestId(textBox), { target: { value: text } });
    // });



    //Nuevo
    // Given(/^you select the opction "(.*)" in "(.*)" button$/, (text, textBox) => {
    //     fireEvent.select(screen.getByTestId(textBox), { target: { value: text } });
    // });

    // When(/^you write "(.*)" in "(.*)"$/, (text, textBox) => {
    //     fireEvent.change(screen.getByTestId(textBox), { target: { value: text } });
    // });

    // Then(/^I should see "(.*)" message in "(.*)"$/, (arg0, arg1) => {

    // });


}
export default formulario

