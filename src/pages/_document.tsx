import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://4pl67mv56j.execute-api.ap-northeast-2.amazonaws.com"/>
                <link rel="stylesheet" href="https://4pl67mv56j.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABo_3xj2TOaybQ99LUHplhInW-FiKYBwUFPYbZEnjTuEEgNrSFGl5Rw1TaSsADatV-e8gMsB-ltGh9h8Jj6emcyXr-YdQjTh0WbqIG_lPujnu0ibgje711ASH4zTQKMBBeF8cugNWJphMvL_Vn7L5iFQp1NrKd7EdJgnReb_TyBTSHCCfto4D6_48nboDaHdppgBv3ltUJF1cM2VPlhLRhq48Ig4lH4XzxLhZRoOuGFJ_sW6AR2M4W1cYk5qrAHh9dh84Zc" charSet="utf-8" referrerPolicy="origin"></link>
            </Head>
            <body className="antialiased">
            <Main/>
            <NextScript/>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        if ('scrollRestoration' in history) {
                            history.scrollRestoration = 'manual';
                        }
                    `,
                }}
            />
            </body>
        </Html>
    );
}
