import json
from django.core.management.base import BaseCommand
from menu.models import MenuItem, MenuSection

class Command(BaseCommand):
    help = 'Imports data from JSON files'

    def handle(self, *args, **kwargs):
        # Load data from JSON files and save to database
        file_path = '../../../../frontend/public/data/starters.json'  # Update this with the correct file path
        section_name = 'Starters'  # Update this with the correct section name
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item_data in data:
                # Assuming the JSON structure matches the MenuItem model
                menu_section, _ = MenuSection.objects.get_or_create(name=section_name)
                MenuItem.objects.create(
                    name=item_data['name'],
                    price=item_data['price'],
                    description=item_data['description'],
                    section=menu_section
                )
