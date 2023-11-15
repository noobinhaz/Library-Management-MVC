<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit07abd10b2728a49c897af01fc68cad78
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit07abd10b2728a49c897af01fc68cad78', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit07abd10b2728a49c897af01fc68cad78', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit07abd10b2728a49c897af01fc68cad78::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
