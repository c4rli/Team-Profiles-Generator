const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamProfileQuestions = {
    profileQuestions: [
        {
            name: "employeeName",
            type: "input",
            message: "Employee Name:"
        },
        {
            name: "employeeID",
            type: "input",
            message: "Employee ID:"
        },
        {
            name: "employeeEmail",
            type: "input",
            message: "Employee Email Address:"
        }
    ],
    specialQuestions: {
        manager: [{
            name: "managerOffice",
            type: "input",
            message: "Office Number"
        }],
        engineer: [{
            name: "engineerGithub",
            type: "input",
            message: "Github Username:"
        }],
        intern: [{
            name: "internSchool",
            type: "input",
            message: "School:"
        }]
    },
    getQuestions(type) {
        return this.profileQuestions.concat(this.specialQuestions[type])
    }
}

const teamArray = [];

const menuOptions = ["Add Engineer", "Add Intern", "Finish Building Team"];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const promptForNextEmployee = () => {
    inquirer.prompt([{
        name: "promptNext",
        type: "list",
        message: "Select:",
        choices: menuOptions
    }]).then(response => {
        displayMenu(response);
    })
}

const displayMenu = (response) => {
    switch (response.promptNext) {
        case menuOptions[0]: promptForEmployee("engineer");
            break;
        case menuOptions[1]: promptForEmployee("intern");
            break;
        case menuOptions[2]: finishBuildingTeam();
            break;
    }
}

const promptForEmployee = (type) => {
    console.log(`
Creating new ${type} profile:`);

    inquirer.prompt(
        teamProfileQuestions.getQuestions(type)
    ).then(response => {
        let employee = "employee";

        if (type === "manager") {
            employee = new Manager(response.employeeName, response.employeeID, response.employeeEmail, response.managerOffice);
        }
        else if (type === "engineer") {
            employee = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, response.engineerGithub);
        }
        else if (type === "intern") {
            employee = new Intern(response.employeeName, response.employeeID, response.employeeEmail, response.internSchool);
        }
        // add new employee to employees array
        teamArray.push(employee);
        promptForNextEmployee();
    })
}

const buildPage = () => {
    console.log(render(teamArray))
    console.log(`Team Profile saved as"index.html" in folder "/output"`)
}

function finishBuildingTeam() {
    
    console.log(teamArray);
    buildPage()
    
}

function displayWelcome(){
    console.log(`
~~~ Welcome to c4rli's Team Profile Generator ~~~

Enter the employee details as prompted, use [enter] to save a value.
The generated .html containing your team cards file will be saved in "/output".
To begin the team must have a manager, please enter the Team Manager's information.`);
}

function appStart() {
    displayWelcome();
    promptForEmployee("manager");
}

appStart();
