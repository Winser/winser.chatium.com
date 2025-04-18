import { jsx } from "@app/html-jsx"
import { TabBar } from "./TabBar"

export const Layout = (props: { title: string }, ...children: any) => {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="/assets/styles/reset.css" />
                <link rel="stylesheet" href="/assets/styles/style.css" />
                <link rel="stylesheet" href="/assets/styles/tabBar.css" />
                <link rel="stylesheet" href="/assets/styles/layout.css" />

                <title>{props.title}</title>
            </head>
            <body>
                <header>
                    <div class="header_title">
                        {props.title}
                    </div>
                </header>

                <main class="content">
                    {children}
                </main>

                <TabBar />
            </body>
        </html>)
}