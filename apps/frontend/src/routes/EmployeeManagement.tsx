import {Col, Container, Row } from "react-bootstrap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs.tsx";
import {GetDataEmployees} from "../components/EmployeeManagerComponent.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {Button} from "../components/ui/button.tsx";
import Global_Footer from "../components/Global_Footer.tsx";
export const EmployeeManager = () => {

    const [formData, setFormData] = useState({
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        });



    // Create employee
    const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/employee-mod', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error submitting form: ${response.status}`);
            }

            console.log('Form submitted successfully');
        } catch (error) {
            console.error({error});
        }
    };

    const handleUpdateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

            try {
                const response = await fetch('/api/employee-mod', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`Error submitting form: ${response.status}`);
                }

                console.log('Form submitted successfully');
            } catch (error) {
                console.error({error});
            }
        };

    const handleDeleteEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/employee-mod', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error submitting form: ${response.status}`);
            }

            console.log('User Deleted Successfully');
        } catch (error) {
            console.error({error});
        }
    };


        return (
            <div>
                <Outlet/>
                <div className={"align-content-center"}>
                    <br/>
                    <br/>
                    <Tabs defaultValue="Create Employee" className="w-screen align-content-center">
                        <TabsList classname-={"align-content-center"}>
                            {/*<TabsTrigger value="Employee List">Employee List</TabsTrigger>*/}
                            <TabsTrigger value="Create Employee">Create Employee</TabsTrigger>
                            <TabsTrigger value="Update Employee">Update Employee</TabsTrigger>
                            <TabsTrigger value="Delete Employee">Delete Employee</TabsTrigger>
                        </TabsList>

                        {/*<TabsContent value="Employee List">*/}

                        <TabsContent value="Create Employee">
                                        <Container>
                                            <Row>
                                                <Col>
                                            <div className="mx-auto bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
                                                <form onSubmit={handleCreateEmployee}>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                                               htmlFor="username">
                                                            Username
                                                        </label>
                                                        <input
                                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                            id="username"
                                                            type="text"
                                                            placeholder="Username"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                username: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                                               htmlFor="firstName">
                                                            First Name
                                                        </label>
                                                        <input
                                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                            id="firstName"
                                                            type="text"
                                                            placeholder="First Name"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                firstName: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                                               htmlFor="lastName">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                            id="lastName"
                                                            type="text"
                                                            placeholder="Last Name"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                lastName: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="mb-6">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                                               htmlFor="email">
                                                            Email
                                                        </label>
                                                        <input
                                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                            id="email"
                                                            type="email"
                                                            placeholder="Email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                email: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <Button variant={"ghost"}>Create</Button>
                                                </form>
                                            </div>
                                                </Col>

                                {/*This is the delete employee thing*/}

                                                <Col>
                                            <GetDataEmployees></GetDataEmployees>
                                                </Col>



                                            </Row>
                                            </Container>
                        </TabsContent>




                        <TabsContent value="Update Employee">
                            <Container>
                                <Row>
                                    <Col>

                                <div className="max-w-md mx-auto bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
                                    <form onSubmit={handleUpdateEmployee}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                id="username"
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                value={formData.username}
                                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="firstName">
                                                First Name
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                id="firstName"
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="lastName">
                                                Last Name
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                id="lastName"
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Button variant={"ghost"}>Update</Button>
                                        </div>
                                    </form>
                                    </div>
                                    </Col>
                                <Col>
                                <GetDataEmployees></GetDataEmployees>
                                </Col>
                                </Row>
                            </Container>
                        </TabsContent>

                        <TabsContent value="Delete Employee">
                            <Container>
                                <Row>
                                    <Col>
                                <div className="mx-auto bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
                                    <form onSubmit={handleDeleteEmployee}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="username">
                                                Delete User by Entering Username
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                id="username"
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                value={formData.username}
                                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            />
                                        </div>
                                        <Button variant={"ghost"}>Delete</Button>

                                    </form>
                                </div>
                                    </Col>
                                    <Col>
                                        <GetDataEmployees></GetDataEmployees>
                                    </Col>
                                </Row>
                            </Container>
                        </TabsContent>
                    </Tabs>
                </div>
                <Global_Footer/>
            </div>
        );
};

export default EmployeeManager;
