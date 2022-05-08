import React, { useContext } from "react"
import { Link } from "gatsby"
import { ThemeContext } from "gatsby-plugin-theme-switcher"
import ThemeSwitcher from "./theme-picker"
import LangSwitcher from "./lang-picker"
import { StaticQuery, graphql } from "gatsby"
import { IntlProvider } from "react-intl"
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n"
import messages from "../lang/messages"
import { FormattedMessage } from "react-intl"

const Layout = ({ location, title, children }) => {
  const { theme, switchTheme } = useContext(ThemeContext)

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              sourceUrl
              languages {
                defaultLangKey
                langs
              }
            }
          }
        }
      `}
      render={data => {
        const url = location.pathname
        const sourceUrl = data.site.siteMetadata.sourceUrl
        const { langs, defaultLangKey } = data.site.siteMetadata.languages
        const langKey = getCurrentLangKey(langs, defaultLangKey, url)
        const homeLink = `/${langKey}/`.replace(`/${defaultLangKey}/`, "/")
        const langsMenu = getLangs(
          langs,
          langKey,
          getUrlForLang(homeLink, url)
        ).map(item => ({
          ...item,
          link: item.link.replace(`/${defaultLangKey}/`, "/"),
        }))
        const rootPath = `${__PATH_PREFIX__}/`
        const isRootPath =
          location.pathname === rootPath || location.pathname === `/${langKey}/`

        return (
          <IntlProvider locale={langKey} messages={messages[langKey]}>
            <div className="global-wrapper" data-is-root-path={isRootPath}>
              <header className="global-header">
                {isRootPath ? (
                  <h1 className="main-heading">
                    <Link to={langKey === "ru" ? `/` : `/${langKey}/`}>
                      {title}
                    </Link>
                  </h1>
                ) : (
                  <Link
                    className="header-link-home"
                    to={langKey === "ru" ? `/` : `/${langKey}/`}
                  >
                    {title}
                  </Link>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <LangSwitcher langsMenu={langsMenu} />
                  <div style={{ width: 10 }} />
                  <ThemeSwitcher theme={theme} setTheme={switchTheme} />
                </div>
              </header>
              <main>{children}</main>
              <footer>
                © {new Date().getFullYear()}, <FormattedMessage id="made" />{" "}
                <Link href={sourceUrl} className="link-hover" target="_blank">
                  {'('}<FormattedMessage id="source" />{')'}
                </Link>
              </footer>
            </div>
          </IntlProvider>
        )
      }}
    />
  )
}

export default Layout
