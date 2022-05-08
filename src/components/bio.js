/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FormattedMessage } from "react-intl"
import { getCurrentLangKey } from "ptz-i18n"

const Bio = ({ location }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          email
          author {
            name
          }
          languages {
            defaultLangKey
            langs
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const email = data.site.siteMetadata?.email

  const url = location.pathname
  const { langs, defaultLangKey } = data.site.siteMetadata.languages
  const langKey = getCurrentLangKey(langs, defaultLangKey, url)
  const rootPath = `${__PATH_PREFIX__}/`
  const isShowMyBlog =
    location.pathname === rootPath ||
    location.pathname === `/${langKey}/` ||
    !location.pathname.includes("blog")

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        quality={95}
        transformOptions={{ fit: "cover" }}
        placeholder="blurred"
        alt="Profile picture"
        style={{ zIndex: -1 }}
      />
      {author?.name && (
        <p>
          <FormattedMessage id="about" />{" "}
          {isShowMyBlog && (
            <Link
              to={langKey === "ru" ? `/blog` : `/${langKey}/blog/`}
              className="link-hover"
            >
              <FormattedMessage id="myBlog" />
            </Link>
          )}
          {' '}
          <Link href={email} className="link-hover">
            <FormattedMessage id="contact" />
          </Link>
        </p>
      )}
    </div>
  )
}

export default Bio
