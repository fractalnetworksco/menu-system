from django.contrib import admin
from .models import MenuSection, MenuItem, Note, MenuHeader

class MenuItemAdmin(admin.ModelAdmin):
    list_display = [ "name", "price", "description" ]

admin.site.register(MenuSection)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(Note)
admin.site.register(MenuHeader)


