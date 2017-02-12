<?php

/* NelmioApiDocBundle:Components:version.html.twig */
class __TwigTemplate_0162c733755d1deac8a7365053d0d6b8739cd7cdf265bdf49864429b366082d2 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        if ((twig_test_empty((isset($context["sinceVersion"]) ? $context["sinceVersion"] : null)) && twig_test_empty((isset($context["untilVersion"]) ? $context["untilVersion"] : null)))) {
            // line 2
            echo "*
";
        } else {
            // line 4
            echo "    ";
            if ( !twig_test_empty((isset($context["sinceVersion"]) ? $context["sinceVersion"] : null))) {
                echo "&gt;=";
                echo twig_escape_filter($this->env, (isset($context["sinceVersion"]) ? $context["sinceVersion"] : null), "html", null, true);
            }
            // line 5
            echo "    ";
            if ( !twig_test_empty((isset($context["untilVersion"]) ? $context["untilVersion"] : null))) {
                // line 6
                echo "        ";
                if ( !twig_test_empty((isset($context["sinceVersion"]) ? $context["sinceVersion"] : null))) {
                    echo ",";
                }
                echo "&lt;=";
                echo twig_escape_filter($this->env, (isset($context["untilVersion"]) ? $context["untilVersion"] : null), "html", null, true);
                echo "
    ";
            }
        }
    }

    public function getTemplateName()
    {
        return "NelmioApiDocBundle:Components:version.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  34 => 6,  31 => 5,  25 => 4,  21 => 2,  19 => 1,);
    }
}
/* {% if sinceVersion is empty and untilVersion is empty %}*/
/* **/
/* {% else %}*/
/*     {% if sinceVersion is not empty %}&gt;={{ sinceVersion }}{% endif %}*/
/*     {% if untilVersion is not empty %}*/
/*         {% if sinceVersion is not empty %},{% endif %}&lt;={{ untilVersion }}*/
/*     {% endif %}*/
/* {% endif %}*/
/* */
