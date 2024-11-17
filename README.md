# UltimateGuideToDynamicTable


![image](https://github.com/user-attachments/assets/bea7d51e-1b32-447f-b65c-2bf53dcc6bcf)
![image](https://github.com/user-attachments/assets/acdbaafc-9841-4032-af9a-44a638ce1c39)


## Overview

The **UltimateGuideToDynamicTable** project is a comprehensive toolkit for creating dynamic, data-driven tables in Angular. It simplifies the implementation of advanced table features such as dynamic column definitions, sorting, filtering, paging, and data binding.

Whether you're building an internal dashboard or a customer-facing application, this project is designed to save time and effort, enabling you to focus on delivering value rather than reinventing the wheel.

---

## Features

### Dynamic Configuration
- Define columns dynamically using JSON-like configurations or API data.
- Modify table behavior (sorting, filtering, etc.) without altering the core code.

### Advanced Table Operations
- **Sorting**: Enable ascending/descending sorting on any column.
- **Filtering**: Provide dynamic filters to search or filter data by column.
- **Paging**: Efficiently handle large datasets with customizable pagination.

### API Integration
- Pre-built examples for fetching and displaying API data.
- Simulated API data for development and testing:
  - `ApiColumns.ts`: Contains column metadata like labels, types, and visibility.
  - `ApiDataItems.ts`: Supplies mock row data for the table.

### Modular and Reusable
- Built as an Angular component to be reusable across multiple applications.
- Compatible with Angular Pipes for data transformation.

### Customizable UI
- Easily adapt table styles using SCSS.
- Add badges, icons, or tooltips to make the table more interactive.

---

## Project Architecture

### File Structure

- **Components**: 
  - `dy-table` – The core component handling table rendering and logic.
- **Fake API Data**:
  - Simulates backend responses for rapid prototyping.
- **Models**:
  - Data models for columns, pagination, and key-value pairs.
- **Pipes**:
  - Provide data transformations for cleaner and more readable UI displays.

### Key Components and Files

| File/Folder                      | Description                                                      |
|----------------------------------|------------------------------------------------------------------|
| `dy-table.component.ts`          | Core logic for the dynamic table, including column and data handling. |
| `ApiColumns.ts`                  | Defines metadata for columns, such as data type, label, and visibility. |
| `ApiDataItems.ts`                | Simulates table data for development.                           |
| `CategoryNamePipe.ts`            | Transforms category IDs into user-friendly names.               |
| `StatusBadgePipe.ts`             | Converts status codes into styled badges for better readability. |
| `app.module.ts`                  | Main module file to import and declare all components and pipes. |

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **Angular CLI**

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone https://github.com/khalifa005/UltimateGuideToDynamicTable.git


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
