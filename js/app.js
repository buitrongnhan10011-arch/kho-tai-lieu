// ==========================================
// 1. KẾT NỐI SUPABASE
// ==========================================

const SUPABASE_URL = "https://axmgzhcozkwekjxbofoh.supabase.co";
const SUPABASE_KEY = "sb_publishable_SQPDN_7N8IBG92iMWFSQ4A_3PYj9ykP";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// 2. LẤY DANH MỤC GỐC TỪ DATABASE
// ==========================================

async function loadCategories() {

    const categoryContainer = document.getElementById("categories");

    if (!categoryContainer) {
        console.error("Không tìm thấy phần tử #categories.");
        return;
    }

    categoryContainer.innerHTML = `
        <p>Đang tải danh mục...</p>
    `;

    // Chỉ lấy thư mục gốc: parent_id IS NULL
    const { data: categories, error } = await supabaseClient
        .from("categories")
        .select(`
            id,
            name,
            slug,
            parent_id,
            requires_password,
            created_at
        `)
        .is("parent_id", null)
        .order("created_at", { ascending: true });

    // Xử lý lỗi
    if (error) {

        console.error("Lỗi tải danh mục:", error);

        categoryContainer.innerHTML = `
            <p>Không thể tải danh mục. Vui lòng thử lại.</p>
        `;

        return;
    }

    // Xóa nội dung cũ
    categoryContainer.innerHTML = "";

    // Kiểm tra danh mục
    if (!categories || categories.length === 0) {

        categoryContainer.innerHTML = `
            <p>Chưa có thư mục nào.</p>
        `;

        return;
    }


    // ==========================================
    // 3. HIỂN THỊ CÁC THƯ MỤC GỐC
    // ==========================================

    categories.forEach(function(category, index) {

        // Tạo thẻ danh mục
        const card = document.createElement("div");

        card.className = "category-card";


        // Khối thông tin
        const info = document.createElement("div");


        // SỐ THỨ TỰ
        const number = document.createElement("span");

        number.className = "category-number";

        number.textContent =
            String(index + 1).padStart(2, "0") +
            " / " +
            String(categories.length).padStart(2, "0");


        // TÊN DANH MỤC
        const heading = document.createElement("h3");

        heading.textContent = category.name;


        // MÔ TẢ
        const description = document.createElement("p");

        description.textContent =
            "Tài liệu học tập " + category.name + ".";


        // TRẠNG THÁI MẬT KHẨU
        const badge = document.createElement("span");

        if (category.requires_password === true) {

            badge.textContent = "🔒 Cần mật khẩu";

            badge.style.cssText = `
                display: inline-block;
                margin-top: 10px;
                padding: 6px 12px;
                border-radius: 20px;
                background: #fff0f0;
                color: #c62828;
                font-size: 13px;
                font-weight: bold;
            `;

        } else {

            badge.textContent = "🔓 Công khai";

            badge.style.cssText = `
                display: inline-block;
                margin-top: 10px;
                padding: 6px 12px;
                border-radius: 20px;
                background: #eaf7ee;
                color: #218838;
                font-size: 13px;
                font-weight: bold;
            `;
        }


        // MŨI TÊN
        const arrow = document.createElement("span");

        arrow.className = "category-arrow";

        arrow.textContent = "→";


        // GHÉP CÁC THÀNH PHẦN
        info.appendChild(number);
        info.appendChild(heading);
        info.appendChild(description);
        info.appendChild(badge);

        card.appendChild(info);
        card.appendChild(arrow);


        // ==========================================
        // 4. CHUYỂN ĐẾN TRANG THƯ MỤC
        // ==========================================

        card.addEventListener("click", function() {

            window.location.href =
                "category.html?folder=" +
                encodeURIComponent(category.slug);

        });


        // ĐƯA THẺ VÀO TRANG CHỦ
        categoryContainer.appendChild(card);

    });

}


// ==========================================
// 5. KHỞI CHẠY
// ==========================================

loadCategories();
