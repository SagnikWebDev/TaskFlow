import { Projects } from "./modals.js";
import { displayElement } from "./utils.js";

const task_create_btn_element = document.querySelector(".create_kanban");

const empty_project_container = document.querySelector(
  ".empty_project_container"
);

function displayEmptyProjectContainer(action) {
  displayElement(action, empty_project_container);
}

const empty_tasks_container = document.querySelector(".empty_tasks_container");
function displayEmptyTasksContainer(action) {
  const kanban_board = document.querySelector(".kanban_board");
  displayElement(action, empty_tasks_container);
  if (action == "hide") {
    kanban_board.style.height = "60dvh";
  }
  if (action == "unhide") {
    kanban_board.style.height = "auto";
  }
}

const projects_section = document.querySelector(".projects_section");

function displayProjectsSection(action) {
  displayElement(action, projects_section, "grid");
}

const project_dashboard_section = document.querySelector(
  ".project_dashboard_section"
);

function displayProjectDashboardSection(action) {
  displayElement(action, project_dashboard_section, "grid");
}

const hero_section = document.querySelector(".hero_section");

function displayHeroSection(action) {
  displayElement(action, hero_section, "grid");
}

const modal_section_element = document.querySelector(".modals_section");
const project_modal_element = document.querySelector(".project_modal");
const kanban_modal_element = document.querySelector(".kanban_modal");

function displayProjectModal(action) {
  if (action == "open") {
    modal_section_element.style.display = "grid";
    project_modal_element.style.display = "flex";
  }
  if (action == "close") {
    modal_section_element.style.display = "none";
    project_modal_element.style.display = "none";
  }
}

project_modal_element.addEventListener("click", (event) => {
  event.stopPropagation();
});

kanban_modal_element.addEventListener("click", (event) => {
  event.stopPropagation();
});

function displayKanbanModal(action) {
  if (action == "open") {
    modal_section_element.style.display = "grid";
    kanban_modal_element.style.display = "flex";
  }
  if (action == "close") {
    modal_section_element.style.display = "none";
    kanban_modal_element.style.display = "none";
  }
}

// start

const projects = new Projects();

projects.reloadProjectsFromLocalStorage();

projects.UdpateReloadProjectsFromLocalStorageOnUi();

if (!projects.empty) {
  displayEmptyProjectContainer("hide");
}

const project_create_btn_element = document.querySelector(".hero_btn");

project_create_btn_element.addEventListener("click", (event) => {
  displayProjectModal("open");
});

const project_create_Modal_btn__container_element =
  document.querySelector(".modals_section");

project_create_Modal_btn__container_element.addEventListener(
  "click",
  (event) => {
    displayProjectModal("close");
  }
);

const project_create_Modal_btn_element =
  document.querySelector(".create_project");
const project_create_Modal_input_element =
  document.querySelector("#project_name");

project_create_Modal_btn_element.addEventListener("click", (event) => {
  event.preventDefault();

  const projectName = project_create_Modal_input_element.value;

  const project = projects.createNewProject(projectName);

  if (projects.empty) projects.empty = false;

  projects.saveProjectsOnLocalStorage();

  project_create_Modal_input_element.value = "";

  displayEmptyProjectContainer("hide");

  projects.displayProjectElementsOnUi("unhide");

  projects.updateProjectElementsOnUi();

  displayProjectModal("close");
});

function deleteProjectsOnUi(target_element) {
  const project_id = target_element.dataset.Id;

  projects.deleteProjectFromProjects(project_id);

  if (!projects.projects.length) {
    projects.empty = true;

    projects.displayProjectElementsOnUi("hide");

    displayEmptyProjectContainer("unhide");
  }

  projects.saveProjectsOnLocalStorage();

  projects.updateProjectElementsOnUi();
}

function displayProjectOnUi(target_element) {
  displayHeroSection("hide");
  displayProjectsSection("hide");
  displayProjectDashboardSection("unhide");

  const project_id = target_element.id;

  const project = projects.getProjectById(project_id);

  const { name } = project;

  const project_dashboard_text_element = document.querySelector(
    ".project_dashboard_text"
  );
  project_dashboard_text_element.innerText = name;
  project_dashboard_text_element.dataset.projectId = project_id;

  const project_dashboard_name_text_element =
    document.querySelector(".project_name_text");
  project_dashboard_name_text_element.innerText = name;

  task_create_btn_element.dataset.projectId = project_id;

  if (!project.isKanbanTableEmpty) {
    displayEmptyTasksContainer("hide");
  }

  project.updateKanbanBoardOnUi();
}

const projects_Container = document.querySelector(".project_wrapper");

projects_Container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (target_element.className == "project_delete_btn") {
    deleteProjectsOnUi(target_element);
  }

  if (target_element.className == "project") {
    displayProjectOnUi(target_element);
  }
});

const home_route_link = document.querySelector(".homeroute_link");

home_route_link.addEventListener("click", (event) => {
  displayHeroSection("unhide");
  displayProjectsSection("unhide");
  displayProjectDashboardSection("hide");
  displayEmptyTasksContainer("unhide");
});

const todo_Add_Btn = document.querySelector(".add_kanban_board_col_todo_task");
const inProgress_Add_Btn = document.querySelector(
  ".add_kanban_board_col_inProgess_task"
);
const done_Add_Btn = document.querySelector(".add_kanban_board_col_done_task");

todo_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "todo";
});
inProgress_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "inProgress";
});
done_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "done";
});

const task_create_input_element = document.querySelector(
  "#kanban_modal_input_label_name"
);

task_create_btn_element.addEventListener("click", (event) => {
  event.preventDefault();
  const target_element = event.target;

  const taskName = task_create_input_element.value;

  const project_id = target_element.dataset.projectId;

  const project = projects.getProjectById(project_id);

  const TaskType = event.target.dataset.TaskType;

  if (TaskType == "todo") {
    project.createTaskOnTodoData(taskName);
  }
  if (TaskType == "inProgress") {
    project.createTaskOnInProgressData(taskName);
  }
  if (TaskType == "done") {
    project.createTaskOnDoneData(taskName);
  }

  if (project.isKanbanTableEmpty) {
    project.KanbanTable_Empty_value = false;
    displayEmptyTasksContainer("hide");
  }

  projects.saveProjectsOnLocalStorage();

  project.updateKanbanBoardOnUi();

  task_create_input_element.value = "";

  displayKanbanModal("close");
});

const kanban_board_todo_tasks_container = document.querySelector(
  ".kanban_board_col_todo_tasks"
);
const kanban_board_inProgress_tasks_container = document.querySelector(
  ".kanban_board_col_inProgess_tasks"
);
const kanban_board_done_tasks_container = document.querySelector(
  ".kanban_board_col_done_tasks"
);

const project_dashboard_text_element = document.querySelector(
  ".project_dashboard_text"
);

kanban_board_todo_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (target_element.className.includes("del_kanban_board_col_todo_task")) {
    const todoTask_id = target_element.id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnTodoData(todoTask_id);

    projects.saveProjectsOnLocalStorage();

    if (!project.kanban_table_data.length) {
      displayEmptyTasksContainer("unhide");
    }

    project.updateKanbanBoardOnUi();
  }
});

kanban_board_inProgress_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (
    target_element.className.includes("del_kanban_board_col_inProgress_task")
  ) {
    const inProgressTask_id = target_element.id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnInProgressData(inProgressTask_id);

    projects.saveProjectsOnLocalStorage();

    if (!project.kanban_table_data.length) {
      displayEmptyTasksContainer("unhide");
    }

    project.updateKanbanBoardOnUi();
  }
});

kanban_board_done_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (target_element.className.includes("del_kanban_board_col_done_task")) {
    const doneTask_id = target_element.id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnDoneData(doneTask_id);

    projects.saveProjectsOnLocalStorage();

    if (!project.kanban_table_data.length) {
      displayEmptyTasksContainer("unhide");
    }

    project.updateKanbanBoardOnUi();
  }
});

const sortBtn = document.querySelector("#sort");

sortBtn.addEventListener("change", (event) => {
  const value = event.target.value;

  if (value == "up") {
    projects.sortProjects("ascending");
  }
  if (value == "down") {
    projects.sortProjects("descending");
  }

  projects.updateProjectElementsOnUi();
});
