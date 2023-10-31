import React, { useEffect, useState } from "react";
import { Button, Form, Input, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Home.css"

export default function Home() {
  const [form] = Form.useForm();
  const location = useLocation();

  const [task, setTask] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate()

  //console.log(location.state.data);

  const user = location.state.data.username
  const id = location.state.data.id
  const usermail = location.state.data.email

  useEffect(() => {
    getAllTasks()
  }, [])

  const getAllTasks = async () => {
    console.log("called");
    await axios.post("http://localhost:5000/api/getTasksById", { id }).then((res) => {
      if (res.data[0] !== undefined) {
        setData(res.data)
      }
    })
  }

  const handleDelete = async (id) => {
    console.log(id, "-------------");
    await axios.post("http://localhost:5000/api/deleteTaskById", { id }).then((res) => {
      if (res.status === 201) {
        getAllTasks();
        alert("Succesufully deleted the task")
        form.resetFields();
      } else if (res.status === 500) {
        alert("error while deleting task, please try after some time")
      }
    })
  }

  const handleSubmit = async () => {
    if (task != "") {
      await axios.post("http://localhost:5000/api/addTask", { task, id }).then((res) => {
        if (res.status === 201) {
          alert("Succesufully added")
          getAllTasks();
          form.resetFields();
        } else if (res.status === 500) {
          alert("error while adding task, please try after some time")
        }
      })
    } else {
      alert("please add task")
    }
  };

  return (
    <div className="taskContainer" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: "59.8%", backgroundColor: 'lightcoral', justifyContent: 'center', marginTop: "-10%" }}>
        <h1 style={{ fontSize: 60 }}>Welcome {user} !</h1>
        <Form form={form} name="addTask" onFinish={handleSubmit}>
          <Form.Item
            name="task"
            rules={[
              {
                type: "text",

                required: true
              },
              {
                message: "Please add your task",
              },
            ]}
          >
            <Input
              style={{ width: "60%" }}
              placeholder="please add your task"
              onChange={(e) => setTask(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: "60%" }}
              type="primary"
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: '0.2%' }}>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', textAlign: 'center', width: "40%", backgroundColor: 'lightblue' }}>
        <h1 style={{ fontSize: 50 }}>Tasks List</h1>
        {data?.[0] !== undefined ?
          <>
            {data.map((item, index) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <h3 style={{ marginRight: "5%", color: 'blue' }}>{index + 1}. {item.task_name}</h3>
                  <Button onClick={() => handleDelete(item.id)} style={{ backgroundColor: "red", color: "white" }}>Delete</Button>
                </div>
              )
            })}
          </> :
          <>
            <h1 style={{ color: "red" }}>No tasks found</h1>
          </>}
      </div>
    </div>
  )
}
