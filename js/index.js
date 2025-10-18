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

const kanbanErrorMsgElement = document.querySelector(".kanban_modal_error_msg");
const projectErrorMsgElement = document.querySelector(
  ".project_modal_error_msg"
);

function displayErrorMsgOnKanbanForm(action) {
  displayElement(action, kanbanErrorMsgElement, "block");
}
function displayErrorMsgOnProjectForm(action) {
  displayElement(action, projectErrorMsgElement, "block");
}

// start

const projects = new Projects();

projects.reloadProjectsFromLocalStorage();

projects.UdpateReloadProjectsFromLocalStorageOnUi();

if (!projects.empty) {
  displayEmptyProjectContainer("hide");
}

const project_create_Modal_input_element =
  document.querySelector("#project_name");

const project_create_btn_element = document.querySelector(".hero_btn");

project_create_btn_element.addEventListener("click", (event) => {
  displayProjectModal("open");
  project_create_Modal_input_element.focus();
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
project_create_Modal_btn_element.addEventListener("click", (event) => {
  event.preventDefault();

  const projectName = project_create_Modal_input_element.value;

  if (!projectName) displayErrorMsgOnProjectForm("unhide");
  const project = projects.createNewProject(projectName);

  if (projects.empty) projects.empty = false;

  projects.saveProjectsOnLocalStorage();

  project_create_Modal_input_element.value = "";

  displayEmptyProjectContainer("hide");

  projects.displayProjectElementsOnUi("unhide");

  projects.updateProjectElementsOnUi();

  displayErrorMsgOnProjectForm("hide");

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

const task_create_input_element = document.querySelector(
  "#kanban_modal_input_label_name"
);

todo_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "todo";
  task_create_input_element.focus();
});
inProgress_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "inProgress";
  task_create_input_element.focus();
});
done_Add_Btn.addEventListener("click", (event) => {
  displayKanbanModal("open");
  task_create_btn_element.dataset.TaskType = "done";
  task_create_input_element.focus();
});

task_create_btn_element.addEventListener("click", (event) => {
  event.preventDefault();
  const target_element = event.target;

  const taskName = task_create_input_element.value;

  if (!taskName) displayErrorMsgOnKanbanForm("unhide");

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

  displayErrorMsgOnKanbanForm("hide");

  displayKanbanModal("close");
});
const project_dashboard_text_element = document.querySelector(
  ".project_dashboard_text"
);
const kanban_board_todo_tasks_container = document.querySelector(
  ".kanban_board_col_todo_tasks"
);
const kanban_board_inProgress_tasks_container = document.querySelector(
  ".kanban_board_col_inProgress_tasks"
);
const kanban_board_done_tasks_container = document.querySelector(
  ".kanban_board_col_done_tasks"
);

kanban_board_todo_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (target_element.className.includes("del_kanban_board_col_todo_task")) {
    const todoTask_id = target_element.dataset.Id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnTodoData(todoTask_id);

    const kanban_board_empty_value = project.updateKanbanEmptyValue();

    if (kanban_board_empty_value) {
      displayEmptyTasksContainer("unhide");
    }

    projects.saveProjectsOnLocalStorage();

    project.updateKanbanBoardOnUi();
  }
});

kanban_board_inProgress_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (
    target_element.className.includes("del_kanban_board_col_inProgress_task")
  ) {
    const inProgressTask_id = target_element.dataset.Id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnInProgressData(inProgressTask_id);

    const kanban_board_empty_value = project.updateKanbanEmptyValue();

    if (kanban_board_empty_value) {
      displayEmptyTasksContainer("unhide");
    }

    projects.saveProjectsOnLocalStorage();

    project.updateKanbanBoardOnUi();
  }
});

kanban_board_done_tasks_container.addEventListener("click", (event) => {
  const target_element = event.target;

  if (target_element.className.includes("del_kanban_board_col_done_task")) {
    const doneTask_id = target_element.dataset.Id;

    const project_id = project_dashboard_text_element.dataset.projectId;

    const project = projects.getProjectById(project_id);

    project.deleteTaskOnDoneData(doneTask_id);

    const kanban_board_empty_value = project.updateKanbanEmptyValue();

    if (kanban_board_empty_value) {
      displayEmptyTasksContainer("unhide");
    }

    projects.saveProjectsOnLocalStorage();

    project.updateKanbanBoardOnUi();
  }
});

function addDragEventOnProjectsContainer(ContainerElement) {
  if (!ContainerElement) throw new Error("ContainerElement not found!");

  ContainerElement.addEventListener("dragstart", (e) => {
    const target_element = e.target;
    if (target_element.className.includes("project")) {
      const id = target_element.id;
      const content = target_element.firstElementChild.innerHTML;
      const contentDate =
        target_element.firstElementChild.nextElementSibling.innerHTML;

      e.dataTransfer.setData(
        "text/plain",
        `name: ${content};id: ${id};date: ${contentDate}`
      );
      e.dataTransfer.effectAllowed = "move";
    }
  });

  ContainerElement.addEventListener("dragover", (e) => {
    const target_element = e.target;
    if (target_element.className.includes("project")) e.preventDefault();
  });

  ContainerElement.addEventListener("drop", (e) => {
    const target_element = e.target;

    if (target_element.className.includes("project")) {
      e.preventDefault();
      const draggedText = e.dataTransfer.getData("text/plain");

      const data = `${draggedText}`.split(";");
      const data_name = data[0];
      const data_id = data[1];
      const data_date = data[2];

      const id = data_id.split(":")[1].trim();
      const name = data_name.split(":")[1].trim();
      const date = data_date.split(":")[1].trim();

      const target_element_contentElement = target_element.firstElementChild;
      const target_element_dateElement =
        target_element_contentElement.nextElementSibling;
      const target_element_btnElement =
        target_element_dateElement.nextElementSibling;

      const dragELement = document.getElementById(id);
      const contentElement = dragELement.firstElementChild;
      const dateElement = contentElement.nextElementSibling;
      const btnElement = dateElement.nextElementSibling;

      dragELement.id = target_element.id;
      contentElement.innerHTML = target_element_contentElement.innerHTML;
      dateElement.innerHTML = target_element_dateElement.innerHTML;
      btnElement.dataset.Id = target_element_btnElement.dataset.Id;

      target_element.id = id;
      target_element_contentElement.innerHTML = name;
      target_element_dateElement.innerHTML = date;
      target_element_btnElement.dataset.Id = id;

      e.dataTransfer.clearData("text/plain");
    }
  });
}

addDragEventOnProjectsContainer(projects_Container);

function addDragEventOnKanbanTasksContainer(ContainerElement) {
  if (ContainerElement) {
    ContainerElement.addEventListener("dragstart", (e) => {
      const target_element = e.target;
      if (
        target_element.className.includes(
          "kanban_board_col_items_tasks_task_container"
        )
      ) {
        const id = target_element.id;
        const name = target_element.firstElementChild.innerHTML;
        e.dataTransfer.setData("text/plain", `name:${name};id:${id}`);
      }
    });

    ContainerElement.addEventListener("dragover", (e) => {
      const target_element = e.target;
      if (
        target_element.className.includes(
          "kanban_board_col_items_tasks_task_container"
        )
      ) {
        e.preventDefault();
      }
    });

    ContainerElement.addEventListener("drop", (e) => {
      const target_element = e.target;

      if (
        target_element.className.includes(
          "kanban_board_col_items_tasks_task_container"
        )
      ) {
        e.preventDefault();

        const draggedText = e.dataTransfer.getData("text/plain").split(";");

        const draggedText_name_data = draggedText[0];
        const draggedText_id_data = draggedText[1];

        const name = draggedText_name_data.split(":")[1];
        const id = draggedText_id_data.split(":")[1];

        const target_name_element = e.target.firstElementChild;
        const target_btn_element = e.target.lastElementChild;

        const query_element = document.getElementById(id);
        const query_name_element = query_element.firstElementChild;
        const query_btn_element = query_element.lastElementChild;

        let idtype = id.split("[")[0];
        if (idtype == "td") idtype = "todo";
        if (idtype == "ip") idtype = "inProgress";
        if (idtype == "d") idtype = "done";

        let targetElementIdtype = target_element.id.split("[")[0];
        if (targetElementIdtype == "td") targetElementIdtype = "todo";
        if (targetElementIdtype == "ip") targetElementIdtype = "inProgress";
        if (targetElementIdtype == "d") targetElementIdtype = "done";

        if (targetElementIdtype == idtype) {
          query_element.setAttribute("id", target_element.id);
          query_name_element.innerHTML = target_name_element.innerHTML;
          query_btn_element.dataset.Id = target_element.id;

          target_element.setAttribute("id", id);
          target_name_element.innerHTML = name;
          target_btn_element.dataset.Id = id;
        } else {
          const project_dashboard_text_element = document.querySelector(
            ".project_dashboard_text"
          );
          const projectId = project_dashboard_text_element.dataset.projectId;

          const project = projects.getProjectById(projectId);

          project.updateTaskById(targetElementIdtype, target_element.id, name);
          if (id.includes("ip")) {
            project.updateTaskById(
              "inProgress",
              id,
              target_name_element.innerHTML
            );
          }
          if (id.includes("td")) {
            project.updateTaskById("todo", id, target_name_element.innerHTML);
          }
          if (id.includes("d")) {
            project.updateTaskById("done", id, target_name_element.innerHTML);
          }

          projects.saveProjectsOnLocalStorage();

          query_name_element.innerHTML = target_name_element.innerHTML;

          target_name_element.innerHTML = name;
        }
        e.dataTransfer.clearData("text/plain");
      }
    });
  }
}

addDragEventOnKanbanTasksContainer(kanban_board_todo_tasks_container);
addDragEventOnKanbanTasksContainer(kanban_board_inProgress_tasks_container);
addDragEventOnKanbanTasksContainer(kanban_board_done_tasks_container);

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
