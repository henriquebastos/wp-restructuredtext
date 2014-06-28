=== WP-ReStructuredText ===
Contributors: henriquebastos
Tags: editor, markup, post
Requires at least: 3.9
Tested up to: 3.9
Stable tag: master
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Use reStructuredText to write WordPress posts and pages.


== Description ==

WP-ReStructuredText enables you to use reStructuredText to write posts
and pages. Once installed, reStructuredText may be input directly into the
editor.

The reSt source is saved with each post/page for future edits. The
rendered HTML output is stored as the actual post content to allow
modification after rendering if desired.

Plugin settings control how reSt will be rendered and for what types of
posts. It's extremely flexible and you can do anything you would do accessing
docutils and it's extensions from a command line.

WP-ReStructuredText requires no template modifications and every effort has been
made to ensure a seamless and simple integration into WordPress.

This plugin was more than inspired by the WordPreSt and WP-Markdown plugins.
Many thanks to they developers.


== Installation ==

1. Install [Docutils](http://docutils.sourceforge.net/index.html) on your
   WordPress hosting server.

2. Download the latest stable WP-ReStructuredText release from the
   [GitHub page](http://github.com/henriquebastos/WP-ReStructuredText/downloads).

3. Unzip the plugin package into the `/wp-content/plugins/` directory. The
   zip file will automatically extract into a `wp-restructuredtext` subdirectory.

4. Activate the plugin through the "Plugins" admin menu in WordPress.

5. Configure the WP-ReStructuredText settings (in the "Settings" admin menu) and
   provide an absolute path to the Docutils `rst2html.py` script.


== Screenshots ==

1. The editor.


== Changelog ==

= 1.0 =
* Initial release.