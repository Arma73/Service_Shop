import React from "react";
import Document, { Main, NextScript, Head } from "next/document";
import { ServerStyleSheets } from "@material-ui/core";
import theme from "theme/Material-UI";

class MyDocument extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					<link rel="icon" href="/static/favicon.ico" />
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
						key="viewport"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	//Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () => originalRenderPage({
		enhanceApp: App => props => sheets.collect(<App {...props} />)
	});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		//Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
	};
};

export default MyDocument;
