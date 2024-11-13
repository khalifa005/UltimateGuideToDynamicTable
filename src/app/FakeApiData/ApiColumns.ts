import { CustomColumn } from "../Models/CustomColumns";

// Sample initialization with e-commerce data in camelCase

export const apiColumns: CustomColumn[] = [
    new CustomColumn("1001", "orderId", "Order ID", "Enter Order ID", 150, 1, "string", "1", "text"),
    new CustomColumn("1002", "customerName", "Customer Name", "Enter Customer Name", 200, 2, "string", "1", "text"),
    new CustomColumn("1003", "productCategory", "Product Category", "Select Category", 180, 3, "dropdown", "2", "text", null, [
        { id: 101, name: "Electronics" },
        { id: 102, name: "Home Appliances" },
        { id: 103, name: "Fashion" },
        { id: 104, name: "Beauty & Personal Care" },
        { id: 105, name: "Books" },
        { id: 106, name: "Sports & Outdoors" },
        { id: 107, name: "Automotive" },
        { id: 108, name: "Health & Wellness" },
        { id: 109, name: "Toys & Games" }
    ]),
    new CustomColumn("1004", "productName", "Product Name", "Enter Product Name", 200, 4, "string", "1", "text"),
    new CustomColumn("1005", "quantity", "Quantity", "Enter Quantity", 100, 5, "number", "1", "text"),
    new CustomColumn("1006", "price", "Price", "Enter Price", 120, 6, "currency", "1", "text"),
    new CustomColumn("1007", "orderDate", "Order Date", "Select Date", 160, 7, "date", "2", "date"),
    new CustomColumn("1008", "status", "Order Status", "Select Status", 150, 8, "dropdown", "1", "text", null, [
        { id: 1, name: "Pending" },
        { id: 2, name: "Shipped" },
        { id: 3, name: "Delivered" },
        { id: 4, name: "Cancelled" }
    ]),
    new CustomColumn("1009", "shippingAddress", "Shipping Address", "Enter Shipping Address", 250, 9, "string", "1", "html"),
    new CustomColumn("1010", "paymentMethod", "Payment Method", "Select Payment Method", 180, 10, "dropdown", "1", "text", null, [
        { id: 1, name: "Credit Card" },
        { id: 2, name: "PayPal" },
        { id: 3, name: "Cash on Delivery" }
    ]),
    new CustomColumn("1011", "notes", "Additional Notes", "Enter Notes", 200, 11, "text", "1", "text")
];