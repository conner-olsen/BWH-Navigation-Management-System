import { Col, Container, Row } from "react-bootstrap";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs.tsx";
import { GetDataEmployees } from "../components/EmployeeManagerComponent.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import Global_Footer from "../components/GlobalFooter.tsx";
import { Label } from "../components/ui/label.tsx";
import { Input } from "../components/ui/input.tsx";
import ExportEmployeeCSVButton from "../components/ExportEmployeeCSVButton.tsx";
import DragNDrop from "../components/DragNDrop.tsx";
import SendAllDataButton from "../components/SendAllDataButton.tsx";
import { GetDataNodes } from "../components/NodesDataBaseTableDisplay.tsx";
import ExportNodeDataToCSVButton from "../components/ExportNodeDataButton.tsx";
import ExportAllDataToCSVButton from "../components/ExportAllButton.tsx";
import ExportEdgeDataToCSVButton from "../components/ExportEdgeDataButton.tsx";
import { GetDataEdges } from "../components/EdgesDataBaseTableDisplay.tsx";

export const EmployeeManager = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // Create employee
  const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employee-mod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`);
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error({ error });
    }
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const handleUpdateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employee-mod", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`);
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error({ error });
    }
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const handleDeleteEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employee-mod", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`);
      }

      console.log("User Deleted Successfully");
    } catch (error) {
      console.error({ error });
    }
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const handleFileDrop = async (file: File) => {
    // Create a FileReader
    const reader = new FileReader();

    // Set up a callback for when the file is loaded
    reader.onload = async (event) => {
      if (event.target) {
        // Extract the CSV content as a string
        const csvString = event.target.result as string;

        console.log(csvString);

        try {
          const res = await fetch("/api/employee-csv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ csvString }), // Send the CSV string as JSON
          });

          console.log(res);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleNodeFileDrop = async (file: File) => {
    // Create a FileReader
    const nodeReader = new FileReader();

    // Set up a callback for when the file is loaded
    nodeReader.onload = async (event) => {
      if (event.target) {
        // Extract the CSV content as a string
        const csvString = event.target.result as string;

        console.log(csvString);

        try {
          const res = await fetch("/api/node-populate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ csvString }), // Send the CSV string as JSON
          });

          console.log(res);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    nodeReader.readAsText(file);
  };

  const handleEdgeFileDrop = async (file: File) => {
    // Create a FileReader
    const edgeReader = new FileReader();

    // Set up a callback for when the file is loaded
    edgeReader.onload = async (event) => {
      if (event.target) {
        // Extract the CSV content as a string
        const csvString = event.target.result as string;

        console.log(csvString);

        try {
          const res = await fetch("/api/edge-populate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ csvString }), // Send the CSV string as JSON
          });

          console.log(res);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    edgeReader.readAsText(file);
  };

  return (
    <>
      <div>
        <Outlet />
        <div
          className="text-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Col>
            <h1>DATA MANAGER</h1>
          </Col>
        </div>

        <div className={"align-content-center container"}>
          <Tabs defaultValue="Create Employee" className="align-content-center">
            <TabsList classname-={"align-content-center"}>
              {/*<TabsTrigger value="Employee List">Employee List</TabsTrigger>*/}
              <TabsTrigger value="Create Employee">Create Employee</TabsTrigger>
              <TabsTrigger value="Update Employee">Update Employee</TabsTrigger>
              <TabsTrigger value="Delete Employee">Delete Employee</TabsTrigger>
              <TabsTrigger value="Node Data">Node Data</TabsTrigger>
              <TabsTrigger value="Edge Data">Edge Data</TabsTrigger>
            </TabsList>

            <br />
            <br />

            <TabsContent value="Create Employee">
              <Row>
                <Col>
                  <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300 ml-1">
                      Export or Import Node, Edge, and Employee Data
                    </p>
                    <SendAllDataButton></SendAllDataButton>
                    <br />
                    <ExportAllDataToCSVButton></ExportAllDataToCSVButton>
                  </Container>

                  <div className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300 ml-1">
                      Add Employee to Database
                    </p>
                    <form onSubmit={handleCreateEmployee}>
                      <div className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-6">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button variant={"default"}>Create</Button>
                    </form>
                  </div>
                </Col>

                {/*This is the delete employee functionality*/}

                <Col>
                  <div className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <ExportEmployeeCSVButton></ExportEmployeeCSVButton>
                    <p></p>
                    <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>

                    <GetDataEmployees></GetDataEmployees>
                  </div>
                </Col>
              </Row>
            </TabsContent>

            <TabsContent value="Update Employee">
              <Row>
                <Col>
                  <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300 ml-1">
                      Export or Import Node, Edge, and Employee Data
                    </p>
                    <SendAllDataButton></SendAllDataButton>
                    <br />
                    <ExportAllDataToCSVButton></ExportAllDataToCSVButton>
                  </Container>

                  <div className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <form onSubmit={handleUpdateEmployee}>
                      <div className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-6">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant={"default"}>Update</Button>
                      </div>
                    </form>
                  </div>
                </Col>
                <Col>
                  <div className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <ExportEmployeeCSVButton></ExportEmployeeCSVButton>
                    <p></p>
                    <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>

                    <GetDataEmployees></GetDataEmployees>
                  </div>
                </Col>
              </Row>
            </TabsContent>

            <TabsContent value="Delete Employee">
              <Row>
                <Col>
                  <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300 ml-1">
                      Export or Import Node, Edge, and Employee Data
                    </p>
                    <SendAllDataButton></SendAllDataButton>
                    <br />
                    <ExportAllDataToCSVButton></ExportAllDataToCSVButton>
                  </Container>

                  <div className=" border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <form onSubmit={handleDeleteEmployee}>
                      <div className="mb-4">
                        <Label htmlFor="username">
                          Delete User by Entering Username
                        </Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button variant={"destructive"}>Delete</Button>
                    </form>
                  </div>
                </Col>
                <Col>
                  <div className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                    <ExportEmployeeCSVButton></ExportEmployeeCSVButton>
                    <p></p>
                    <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>

                    <GetDataEmployees></GetDataEmployees>
                  </div>
                </Col>
              </Row>
            </TabsContent>

            {/* Node and Edge Data */}
            <TabsContent value="Node Data">
              <Container className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="container flex max-[576px]:justify-center">
                  <ExportNodeDataToCSVButton></ExportNodeDataToCSVButton>
                </div>
                <br />
                <DragNDrop onFileDrop={handleNodeFileDrop}></DragNDrop>
                <GetDataNodes></GetDataNodes>
              </Container>
            </TabsContent>
            <TabsContent value="Edge Data">
              <Container className="bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="container flex max-[576px]:justify-center">
                  <ExportEdgeDataToCSVButton></ExportEdgeDataToCSVButton>
                </div>
                <br />
                <DragNDrop onFileDrop={handleEdgeFileDrop}></DragNDrop>
                <GetDataEdges></GetDataEdges>
              </Container>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Global_Footer />
    </>
  );
};

export default EmployeeManager;
