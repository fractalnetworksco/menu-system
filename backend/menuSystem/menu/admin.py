from django.contrib import admin
from django.contrib.auth.models import User, Group
from .models import MenuSection, MenuItem, Note, MenuHeader

class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "description", "section")
    list_editable = ("name", "price", "description", "section")
    list_display_links = None
    search_fields = ("name", "description", "section__name")
    ordering = ("name",)

class MenuSectionAdmin(admin.ModelAdmin):
    list_display = ("name", "note", "type")
    list_editable = ("name", "note")
    list_display_links = None
    search_fields = ("name",)
    ordering = ("name",)

admin.site.register(MenuSection, MenuSectionAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(Note)
admin.site.unregister(User)
admin.site.unregister(Group)


