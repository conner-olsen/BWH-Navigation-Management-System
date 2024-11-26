import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input.tsx";
import { Col, Container, Row } from "react-bootstrap";
import { Label } from "../../components/ui/label.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Textarea } from "../../components/ui/textarea.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.tsx";

const ExternalTransportation: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    nodeId: "",
    name: "",
    destination: "",
    transportation: "",
    date: "",
    description: "",
    priority: "",
    status: "Unassigned",
    employeeUser: "none",
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/api/service-request/external-transportation",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        console.log("Data sent successfully");
      } else {
        console.error("Error sending data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setFormData({
      id: "",
      nodeId: "",
      name: "",
      description: "",
      transportation: "",
      date: "",
      destination: "",
      priority: "",
      status: "Unassigned",
      employeeUser: "none",
    });
  };

  return (
    <Container>
      <h1 className=" bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent dark:text-white text-center">
        External Transportation Request
      </h1>
      <div
        className={
          "border-2 border-blue-600 dark:border-blue-400 rounded-lg pb-4 px-4"
        }
      >
        <Container>
          <Row>
            <div className="col-sm">
              <br />
              <div>
                <Label htmlFor="name">Patient Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder={"Tanya Khan"}
                  onChange={handleChangeText}
                />
              </div>
            </div>
            <div className="col-sm">
              <br />
              <div>
                <Label htmlFor="transportation">Transportation</Label>
                <Input
                  type="text"
                  id="transportation"
                  placeholder={"Ambulance"}
                  onChange={handleChangeText}
                />
              </div>
            </div>
          </Row>

          <Row>
            <div className="col-sm">
              <br />
              <div>
                <Label>Priority</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low Priority">Low Priority</SelectItem>
                    <SelectItem value="High Priority">High Priority</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-sm">
              <br />
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  type="text"
                  id="destination"
                  placeholder={"Mayo Clinic"}
                  onChange={handleChangeText}
                />
              </div>
            </div>
          </Row>

          <Row>
            <div className="col-sm">
              <br />
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="text"
                  id="date"
                  placeholder={"02/14/2024"}
                  onChange={handleChangeText}
                />
              </div>
            </div>
            <div className="col-sm">
              <br />
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder={"Subdural Hematoma"}
                  onChange={handleChangeTextArea}
                />
              </div>
            </div>

            <br />
          </Row>
          <br />
          <Row>
            <LocationDropdown
              onChange={(value) =>
                setFormData({
                  ...formData,
                  nodeId: value,
                })
              }
            ></LocationDropdown>
          </Row>
          <br />

          <Row>
            <Col className={"justify-center flex"}>
              <Button variant={"default"} onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
};
export default ExternalTransportation;
