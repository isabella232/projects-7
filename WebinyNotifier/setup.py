from distutils.core import setup

setup(
    name='WebinyTrayNotifier',
    version='1.0',
    packages=['ui', 'ui.designer', 'ui.wrappers', 'lib', 'lib.tools', 'lib.entity', 'lib.entity.viewModel',
              'lib.entity.viewModel.delegate'],
    url='www.webiny.com',
    license='',
    author='Pavel',
    author_email='pavel@webiny.com',
    description='',
    windows=[{"script": "main.py",
              "icon_resources": [(1, "C:\Users\Pavel\Desktop\webiny-logo-icon.ico")],
              "dest_base": "WebinyTrayNotifier"}
    ],
    options={"py2exe": {"includes": ["sip"], "bundle_files": 1}}
)
