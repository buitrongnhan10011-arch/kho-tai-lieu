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

    categoryContainer.innerHTML = "<p>Đang tải danh mục...</p>";

    const { data: categories, error } = await supabaseClient
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Lỗi tải danh mục:", error);
        categoryContainer.innerHTML = "<p>Không thể tải danh mục.</p>";
        return;
    }

    categoryContainer.innerHTML = "";

    categories.forEach((category, index) => {
        const card = document.createElement("div");

        card.className = "category-card";

        card.innerHTML = `
            <div>
                <span class="category-number">
                    ${String(index + 1).padStart(2, "0")} / ${String(categories.length).padStart(2, "0")}
                </span>

                <h3>${category.name}</h3>

                <p>Tài liệu học tập ${category.name}.</p>
            </div>

            <span class="category-arrow">→</span>
        `;

        card.addEventListener("click", () => {
            window.location.href = `category.html?folder=${category.slug}`;
        });

        categoryContainer.appendChild(card);
    });
}

// CHẠY CHƯƠNG TRÌNH
loadCategories();