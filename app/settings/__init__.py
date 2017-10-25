# global settings

DATABASE = {}

try:
    from .settings_local import *
except ImportError:
    pass
