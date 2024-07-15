#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log(chalk.bold.rgb(255, 0, 0)(`\n \t\t <<<==================>>>`));
console.log(chalk.bold.rgb(255, 0, 0)(`<<<===========>>> ${chalk.bold.hex(`#00FFFF`)(`Welcome to my Todo-List!`)} <<<===========>>>`));
console.log(chalk.bold.rgb(255, 0, 0)(`\t\t <<<==================>>>\n`));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do?",
                choices: [chalk.green("Add Task"), chalk.red("Delete Task"), chalk.yellow("Update Task"), chalk.blue("View Todo-List"), chalk.red("Exit")]
            }
        ]);
        if (option.choice === chalk.green("Add Task")) {
            await addTask();
        }
        else if (option.choice === chalk.red("Delete Task")) {
            await deleteTask();
        }
        else if (option.choice === chalk.yellow("Update Task")) {
            await updateTask();
        }
        else if (option.choice === chalk.blue("View Todo-List")) {
            viewTasks();
        }
        else if (option.choice === chalk.red("Exit")) {
            conditions = false;
        }
        else {
            console.log(chalk.redBright("Invalid Option"));
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.magentaBright.bold("Enter the task you want to add:"),
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n "${chalk.magenta.bold(newTask.task)}" Task added successfully in Todo-List\n`);
};
let deleteTask = async () => {
    await viewTasks();
    let deleteTaskPrompt = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellowBright("Enter the `index of` the task to delete:"),
        }
    ]);
    let deletedTask = todoList.splice(deleteTaskPrompt.index - 1, 1);
    console.log(`\n "${chalk.yellow.bold(deletedTask)}" Task deleted successfully from Todo-List\n`);
};
let updateTask = async () => {
    await viewTasks();
    let updateTaskPrompt = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magentaBright("Enter the `index no` of the task to update:"),
        },
        {
            name: "task",
            type: "input",
            message: chalk.blueBright.bold("Now Enter the updated task:"),
        }
    ]);
    todoList[updateTaskPrompt.index - 1] = updateTaskPrompt.task;
    console.log(`\n Task at index ${updateTaskPrompt.index} updated to "${chalk.greenBright.bold(updateTaskPrompt.task)}" successfully [Check "View Todo-List" for updated list]\n`);
};
let viewTasks = () => {
    console.log(chalk.blueBright.bold("\n YourTodo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
main();
