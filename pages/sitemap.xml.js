export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL || "https://morgap-v2.vercel.app";
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/common/sitemap`;


  // const cookies = cookie.parse(req.headers.cookie || "");
  // const token = cookies.Authorization;
  //
  // if (!token) {
  //   res.statusCode = 401;
  //   res.end("Unauthorized: No token in cookie");
  //   return { props: {} };
  // }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const json = await response.json();
    const items = json?.Data?.items || [];

    const locales = ["en", "ar"];

    const urls = items
      .filter((item) => {
        if (item.group_title === "General") {
          return item.url === "/";
        }
        return true;
      })
      .map((item) => {
        const defaultLocaleUrl = `${baseUrl}/en${item.url === "/" ? "" : item.url}`;

        const altLinks = locales
          .map((locale) => {
            const href = `${baseUrl}/${locale}${item.url === "/" ? "" : item.url}`;
            return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
          })
          .join("");

        return `
      <url>
        <loc>${defaultLocaleUrl}</loc>
        ${altLinks}
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
      });


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  ${urls.join("")}
</urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
