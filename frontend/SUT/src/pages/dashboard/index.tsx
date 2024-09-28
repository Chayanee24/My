import { Col, Row, Card, Statistic, Table, Button } from "antd";
import { AuditOutlined, UserOutlined, PieChartOutlined, StockOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface ConcertDataType {
  key: string;
  name: string;
  artist: string;
  showDate: string;
  venue: string;
  ticketsAvailable: number;
}

const columns: ColumnsType<ConcertDataType> = [
  {
    title: "ลำดับ",
    dataIndex: "key",
    key: "id",
  },
  {
    title: "ชื่อคอนเสิร์ต",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ศิลปิน",
    dataIndex: "artist",
    key: "artist",
  },
  {
    title: "วันที่แสดง",
    dataIndex: "showDate",
    key: "showDate",
  },
  {
    title: "สถานที่จัดงาน",
    dataIndex: "venue",
    key: "venue",
  },
  {
    title: "จำนวนบัตรที่มี",
    dataIndex: "ticketsAvailable",
    key: "ticketsAvailable",
  },
  {
    title: "",
    render: (record) => (
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => handlePurchase(record.key)}
      >
        ซื้อบัตร
      </Button>
    ),
  },
];

// Sample data
const data: ConcertDataType[] = [
  {
    key: '1',
    name: 'คอนเสิร์ต A',
    artist: 'ศิลปิน A',
    showDate: '2024-10-01',
    venue: 'สถานที่ A',
    ticketsAvailable: 100,
  },
  {
    key: '2',
    name: 'คอนเสิร์ต B',
    artist: 'ศิลปิน B',
    showDate: '2024-11-01',
    venue: 'สถานที่ B',
    ticketsAvailable: 50,
  },
  // เพิ่มข้อมูลคอนเสิร์ตอื่น ๆ ที่นี่
];

const handlePurchase = (concertId: string) => {
  // เพิ่มฟังก์ชันที่ทำให้ผู้ใช้สามารถซื้อบัตรได้
  console.log(`ซื้อบัตรสำหรับคอนเสิร์ต ID: ${concertId}`);
  // คุณสามารถนำผู้ใช้ไปยังหน้าชำระเงินได้ที่นี่
};

export default function ConcertDashboard() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <h2>แดชบอร์ดคอนเสิร์ต</h2>
        </Col>
        <Col xs={24}>
          <Card style={{ backgroundColor: "#000000" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12} lg={6}>
                <Card bordered={false}>
                  <Statistic title="จำนวนคอนเสิร์ตทั้งหมด" value={data.length} prefix={<StockOutlined />} />
                </Card>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Card bordered={false}>
                  <Statistic title="คอนเสิร์ตที่มีบัตร" value={data.filter(concert => concert.ticketsAvailable > 0).length} prefix={<AuditOutlined />} />
                </Card>
              </Col>
              {/* สามารถเพิ่มสถิติอื่น ๆ ตามต้องการได้ที่นี่ */}
            </Row>
          </Card>
        </Col>
        <Col xs={24}>
          <h3>คอนเสิร์ตที่มีอยู่</h3>
        </Col>
        <Col xs={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}
