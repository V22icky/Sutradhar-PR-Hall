import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CssLink.css';

/**
 * CssLink001 - Underline reveal from Left to Right
 */
export const CssLink001 = ({ to, href, children, ...props }) => {
  if (to) {
    return <Link to={to} className="css-link css-link-001" {...props}>{children}</Link>;
  }
  return <a href={href} className="css-link css-link-001" {...props}>{children}</a>;
};

/**
 * CssLink002 - Underline reveal from Right to Left
 */
export const CssLink002 = ({ to, href, children, ...props }) => {
  if (to) {
    return <Link to={to} className="css-link css-link-002" {...props}>{children}</Link>;
  }
  return <a href={href} className="css-link css-link-002" {...props}>{children}</a>;
};

/**
 * CssLink003 - Underline reveal from Center Out
 */
export const CssLink003 = ({ to, href, children, ...props }) => {
  if (to) {
    return <Link to={to} className="css-link css-link-003" {...props}>{children}</Link>;
  }
  return <a href={href} className="css-link css-link-003" {...props}>{children}</a>;
};

/**
 * CssLink004 - Height block stretch highlight
 */
export const CssLink004 = ({ to, href, children, ...props }) => {
  if (to) {
    return <Link to={to} className="css-link css-link-004" {...props}>{children}</Link>;
  }
  return <a href={href} className="css-link css-link-004" {...props}>{children}</a>;
};

/**
 * CssLink005 - Width block stretch highlight
 */
export const CssLink005 = ({ to, href, children, ...props }) => {
  if (to) {
    return <Link to={to} className="css-link css-link-005" {...props}>{children}</Link>;
  }
  return <a href={href} className="css-link css-link-005" {...props}>{children}</a>;
};
