=======================================
A reStructuredText Plugin For WordPress
=======================================

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

.. more

.. contents::


Installation
------------

1. Install `Docutils`_ on your WordPress hosting server.

2. Download the latest stable WP-ReStructuredText release from the `GitHub page`_.

3. Unzip the plugin package into the ``/wp-content/plugins/`` directory. The
   zip file will automatically extract into a ``wp-restructuredtext`` subdirectory.

4. Activate the plugin through the "Plugins" admin menu in WordPress.

5. Configure the WP-ReStructuredText settings (in the "Settings" admin menu) and
   provide an absolute path to the Docutils ``rst2html.py`` script.
   WP-ReStructuredText does its best to locate the script automatically, but
   often requires manual configuration.

.. _Docutils: http://docutils.sourceforge.net/index.html
.. _GitHub page: http://github.com/henriquebastos/WP-ReStructuredText/downloads


The Future
----------

Here are a few desired features for WP-ReStructuredText:

* HTML conversion arguments should be configurable on a per-post basis,
  overriding the global options. The post specific options could be stored
  in an additional meta field.

* Use ACE editor with syntax highlight for ReST.

* Add a cheatsheet_ for people new to ReST.

* Add buttons and tools to enable all the most commons ReST markups.

.. _cheatsheet: http://docutils.sourceforge.net/docs/user/rst/quickref.html
