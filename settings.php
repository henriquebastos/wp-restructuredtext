<?php
/*
Plugin Name: WP-ReStructuredText
Description: Allows you to use ReStructuredText in posts and pages
Version: 1.0
Plugin URI: http://henriquebastos.net/projects/wp-restructuredtext/
Author: Henrique Bastos
Author URI: http://henriquebastos.net
*/
/*  Copyright 2014 Henrique Bastos (henrique@bastos.net)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
*/

/*
* Settings class is meant to separate all the inumerous pieces of code to add
* configuration fields to Wordpress settings interface.
* It should be instantiated by the actual plugin class passing the config prefix.
*/
class Settings {

    static $domain = null;

    //Options and defaults
    static $options = array(
        'post_types' => array(
            'default' => array(),
            'type' => 'array',
            'help' => 'Enable ReStructuredText for:',
            'callback' => 'settings_post_types'
        ),
        'rst2html_path' => array(
            'default' => '/usr/local/bin/rst2html.py',
            'type' => 'binary',
            'help' => 'rst2html Path',
            'callback' => 'settings_rst2html_path'
        ),
        'rst2html_args' => array(
            'default' => '--link-stylesheet --toc-entry-backlinks --initial-header-level=2  --no-doc-title --no-footnote-backlinks',
            'type' => 'string',
            'help' => 'rst2html Arguments',
            'callback' => 'settings_rst2html_args'
        ),
    );

    public function __construct($domain) {
        self::$domain = $domain;
    }

    /*
    * Returns an map with options and it's default values.
    */
    function options_defaults(){
        $defaults = array();
        foreach (self::$options as $option => $attrs) {
            $defaults[$option] = $attrs['default'];
        }
        return $defaults;
    }

    /*
    * Hook to initialize the wp-admin interface.
    */
    public function admin_init(){
        $group = 'writing';
        $section = self::$domain.'_section';

        register_setting($group, self::$domain, array($this, 'setting_validate'));

        add_settings_section($section, 'ReStructuredText', array($this, 'settings_section'), $group);

        // Add each field found on $options array.
        foreach (self::$options as $option => $a) {
            $id = self::$domain."_{$option}";
            add_settings_field($id, __($a['help'], self::$domain), array($this, $a['callback']), $group, $section);
        }
    }

    /*
    * Callback to validate setting's submited data.
    */
    function setting_validate($data){
        $clean = array();

        foreach (self::$options as $option => $attrs){
            $default = $attrs['default'];
            $type = $attrs['type'];

            switch ($type) {
                case 'array':
                    $clean[$option] = isset($data[$option]) ? array_map('esc_attr', $data[$option]) : $default;
                    break;
                case 'checkbox':
                    $clean[$option] = isset($data[$option]) ? (int) $data[$option] : $default;
                default:
                    $clean[$option] = isset($data[$option]) ? (string) $data[$option] : $default;
                    break;
            }
        }
        return $clean;
    }

    /*
    * Callback for creating a form section.
    */
    function settings_section(){
        $help = __('Select the post types that will support ReStructuredText.', self::$domain);
        echo "<p>{$help}</p>";
    }

    /*
    * Callback to render post_types checkboxes.
    */
    function settings_post_types($args){
        $options = get_option(self::$domain);
        $savedtypes = (array) $options['post_types'];
        $types = get_post_types(array('public' => true), 'objects');
        unset($types['attachment']);

        $name = self::$domain.'[post_types][]';

        foreach ($types as $type){
            $checked = checked(in_array($type->name, $savedtypes), true, false);

            echo "<label><input type='checkbox' {$checked} name='{$name}' value='{$type->name}' />{$type->labels->name}</label></br>";
        }
    }

    /*
    * Callback to render rst2html_path textfield.
    */
    function settings_rst2html_path(){
        $options = get_option(self::$domain);
        $value = $options['rst2html_path'];
        $id = self::$domain."[rst2html_path]";

        echo "<input type='text' name='{$id}' value='{$value}' />
              <span class='description'>The absolute path to the docutils rst2html.py script.</span>";
    }

    /*
    * Callback to render rst2html_args textarea.
    */
    function settings_rst2html_args($args){
        $options = get_option(self::$domain);
        $value = $options['rst2html_args'];
        $id = self::$domain."[rst2html_args]";

        echo "<textarea name='{$id}'>{$value}</textarea>
              <span class='description'>The arguments that will be passed to rst2html.py.</span>";
    }
}
?>