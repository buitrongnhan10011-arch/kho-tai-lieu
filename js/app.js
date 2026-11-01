// KẾT NỐI SUPABASE
const SUPABASE_URL = "https://axmgzhcozkwekjxbofoh.supabase.co";

const SUPABASE_KEY = "sb_publishable_SQPDN_7N8IBG92iMWFSQ4A_3PYj9ykP";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

// LẤY DANH MỤC TỪ DATABASE
async function loadCategories() {
const categoryContainer = document.getElementById("categories");

```
categoryContainer.innerHTML = "<p>Đang tải danh mục...</p>";

const { data: categories, error } = await supabaseClient
    .from("categories")
    .select("id, name, slug, requires_password, created_at")
    .order("created_at", { ascending: true });

if (error) {
    console.error("Lỗi tải danh mục:", error);
    categoryContainer.innerHTML = "<p>Không thể tải danh mục.</p>";
    return;
}

categoryContainer.innerHTML = "";

if (!categories || categories.length === 0) {
    categoryContainer.textContent = "Chưa có danh mục tài liệu.";
    return;
}

categories.forEach((category, index) => {
    const card = document.createElement("div");
    card.className = "category-card";

    const info = document.createElement("div");

    // SỐ THỨ TỰ
    const number = document.createElement("span");
    number.className = "category-number";
    number.textContent =
        ${String(index + 1).padStart(2, "0")} / ${String(categories.length).padStart(2, "0")}`;

    // TÊN DANH MỤC
    const heading = document.createElement("h3");
    heading.textContent = category.name;

    // MÔ TẢ
    const description = document.createElement("p");
    description.textContent =
        `Tài liệu học tập ${category.name}.`;

    // TRẠNG THÁI MẬT KHẨU
    const badge = document.createElement("span");

    if (category.requires_password) {
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

    // GHÉP THẺ
    info.appendChild(number);
    info.appendChild(heading);
    info.appendChild(description);
    info.appendChild(badge);

    card.appendChild(info);
    card.appendChild(arrow);

    // CHUYỂN ĐẾN DANH MỤC
    card.addEventListener("click", () => {
        window.location.href =
            `category.html?folder=${encodeURIComponent(category.slug)}`;
    });

    categoryContainer.appendChild(card);
});
```

}

// CHẠY CHƯƠNG TRÌNH
loadCategories();
