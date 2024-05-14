from django.contrib import admin
from .models import MenuSection, MenuItem, SelectionItem, SelectionSection, Note, MenuHeader

admin.site.register(MenuSection)
admin.site.register(MenuItem)
admin.site.register(SelectionItem)
admin.site.register(SelectionSection)
admin.site.register(Note)
admin.site.register(MenuHeader)


