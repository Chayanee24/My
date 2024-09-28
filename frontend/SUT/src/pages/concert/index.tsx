// import { useState, useEffect } from "react";
// import { Space,Table,Button,Col,Row,Divider,message,Input,Popconfirm,} from "antd";
// import {PlusOutlined,DeleteOutlined,SearchOutlined,} from "@ant-design/icons";
// import type { ColumnsType } from "antd/es/table";
// import { GetConcert, DeleteConcertrByID } from "../../service/https";
// import { ConcertInterface } from "../../interface/Concerts";
// import { Link, useNavigate } from "react-router-dom";

// function Concerts() {
//   const navigate = useNavigate();
//   const [concerts, setConcerts] = useState<ConcertInterface[]>([]);
//   const [messageApi, contextHolder] = message.useMessage();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searchText, setSearchText] = useState<string>("");
//   const myId = localStorage.getItem("id");

//   const getConcerts = async () => {
//     setLoading(true);
//     try {
//       let res = await GetConcert();
//       if (res.status === 200) {
//         setConcerts(res.data);
//       } else {
//         setConcerts([]);
//         messageApi.open({
//           type: "error",
//           content: res.data.error || "Error fetching concerts.",
//         });
//       }
//     } catch (error) {
//       setConcerts([]);
//       messageApi.open({
//         type: "error",
//         content: "Failed to fetch concerts.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteConcertById = async (id: number) => {
//     try {
//       let res = await DeleteConcertrByID(id);
//       if (res) {
//         messageApi.open({
//           type: "success",
//           content: res.data.message,
//         });
//         await getConcerts();
//       } else {
//         messageApi.open({
//           type: "error",
//           content: res.data.error || "Error deleting concert.",
//         });
//       }
//     } catch (error) {
//       messageApi.open({
//         type: "error",
//         content: "Failed to delete concert.",
//       });
//     }
//   };

//   const filteredConcerts = concerts.filter((concert) =>
//     concert.Name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   useEffect(() => {
//     getConcerts();
//   }, []);

//   const columns: ColumnsType<ConcertInterface> = [
//     {
//       title: "",
//       render: (record) => (
//         <>
//           {myId === record?.ID ? (
//             <></>
//           ) : (
//             <Popconfirm
//               title="Are you sure to delete this concert?"
//               onConfirm={() => deleteConcertById(record.ID)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button type="dashed" danger icon={<DeleteOutlined />} />
//             </Popconfirm>
//           )}
//         </>
//       ),
//     },
//     {
//       title: "ID",
//       dataIndex: "ID",
//       key: "id",
//       width: 50,
//     },
//     {
//       title: "ชื่อคอนเสิร์ต",
//       dataIndex: "Name",
//       key: "name",
//       width: 200,
//     },
//     {
//       title: "วันที่แสดง",
//       dataIndex: "ShowDate",
//       key: "show_date",
//       width: 150,
//     },
//     {
//       title: "ศิลปิน",
//       dataIndex: "Artist",
//       key: "artist",
//       width: 150,
//     },
//     {
//       title: "คำอธิบาย",
//       dataIndex: "Description",
//       key: "description",
//       width: 200,
//     },
//     {
//       title: "วันที่เริ่มขายบัตร",
//       dataIndex: "TicketSalesStartDate",
//       key: "ticket_sales_start_date",
//       width: 150,
//     },
//     {
//       title: "สถานที่จัดงาน",
//       dataIndex: "Venue",
//       key: "venue",
//       width: 150,
//     },
//     {
//       title: "สถานะ",
//       dataIndex: "Status",
//       key: "status",
//       width: 100,
//     },
//     {
//       title: "",
//       render: (record) => (
//         <Button
//           type="primary"
//           icon={<DeleteOutlined />}
//           onClick={() => navigate(`/concert/edit/${record.ID}`)}
//         >
//           แก้ไขข้อมูล
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       {contextHolder}
//       <Row>
//         <Col span={12}>
//           <h2>Concert List</h2>
//         </Col>
//         <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
//           <Space style={{ alignItems: "center", justifyContent: "center" }}>
//             <Input
//               placeholder="ค้นหาคอนเสิร์ต"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ marginBottom: 0, width: 200 }}
//               prefix={<SearchOutlined />}
//             />
//             <Link to="/concert/create">
//               <Button type="primary" icon={<PlusOutlined />}>
//                 Add Concert
//               </Button>
//             </Link>
//           </Space>
//         </Col>
//       </Row>
//       <Divider />
//       <div style={{ marginTop: 20 }}>
//         <Table
//           rowKey="ID"
//           columns={columns}
//           dataSource={filteredConcerts} // use the filtered concerts list here
//           loading={loading}
//           locale={{
//             emptyText: "ไม่พบข้อมูลคอนเสิร์ต",
//           }}
//           style={{ width: "100%", overflow: "scroll" }}
//         />
//       </div>
//     </>
//   );
// }

// export default Concerts;
