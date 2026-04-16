/// here will be tests for todo app using playwright

import {expect, Locator, test} from "@playwright/test";

const URL = 'https://todo-app.tallinn-learning.ee/';
test.only('create a task', async ({ page }) => {

    await page.goto(URL)

    const todoInput: Locator = page.getByTestId('text-input')
    await todoInput.fill('my first task')
    await todoInput.press("Enter")

    const todoTask: Locator = page.getByTestId('todo-item-label')
    // now let's verify element is visible
    await expect(todoTask).toBeVisible()

});





test.only('create a two  task and valitade filter', async ({ page }) => {

    await page.goto(URL)
//task one
    const todoInput: Locator = page.getByTestId('text-input')
    await todoInput.fill('my first task')
    await todoInput.press("Enter")
//task two
    await todoInput.fill('my first task')
    await todoInput.press("Enter")



   //check that we have 2 items (task)
    const todoTask: Locator = page.getByTestId('todo-item-label').first()
    // now let's verify element is visible
    await expect(todoTask).toBeVisible()

});

test.only('create a task and mark completed -new', async ({ page }) => {

    await page.goto(URL)
// task one
    const todoInput: Locator = page.getByTestId('text-input');
    await todoInput.fill('my first task');
    await todoInput.press('Enter');

// element for task activation - toggle
    const toggle: Locator = page.getByTestId('todo-item-toggle');

// activate task
    await toggle.click();

// check task is visible
    const todoTask: Locator = page.getByTestId('todo-item-label').first();
    await expect(todoTask).toBeVisible();

// link for completed task
    const completedLink: Locator = page.getByRole('link', {name: 'completed'});
    await completedLink.click();

// verify task count after filtering completed
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
    // completed task is not visible as active
    const activeLink: Locator = page.getByRole('link', {name: 'active'});
    await activeLink.click();
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
    // button to clear completed
    const clearBtn: Locator = page.getByRole('button', {name: 'clear completed'});
    await clearBtn.click();
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test.only('create a task and mark completed', async ({ page }) => {

    await page.goto(URL)
// task one
    const todoInput: Locator = page.getByTestId('text-input');
    await todoInput.fill('my first task');
    await todoInput.press('Enter');

    //double click to rename item
    const todotask: Locator = page.getByTestId('todo-item-label');
    await todotask.dblclick();
    await page.getByTestId('todo-item').getByTestId('text-input').fill('my first updated');
    await page.getByTestId('todo-item').getByTestId('text-input').press('Enter');

    await todotask.press('Enter');
});