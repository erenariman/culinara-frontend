import os
import re

ICON_MAPPING = {
    'restaurant': 'Utensils',
    'search': 'Search',
    'light_mode': 'Sun',
    'dark_mode': 'Moon',
    'person': 'User',
    'favorite': 'Heart',
    'group': 'Users',
    'schedule': 'Clock',
    'oven_gen': 'ChefHat',
    'local_fire_department': 'Flame',
    'mail': 'Mail',
    'share': 'Share2',
    'public': 'Globe',
    'send': 'Send',
    'bookmark': 'Bookmark',
    'print': 'Printer',
    'star': 'Star',
    'star_half': 'StarHalf',
    'filter_list': 'Filter',
    'restaurant_menu': 'UtensilsCrossed',
    'edit': 'Edit3',
    'fireplace': 'Flame',
    'shopping_basket': 'ShoppingBasket',
    'analytics': 'BarChart2',
    'task_alt': 'CheckCircle2',
    'arrow_back': 'ArrowLeft',
    'arrow_forward': 'ArrowRight',
    'drag_indicator': 'GripVertical',
    'delete': 'Trash2',
    'add_a_photo': 'Camera',
    'add_circle': 'PlusCircle',
    'timer': 'Timer',
    'cooking': 'ChefHat'
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <span className="... material-symbols-outlined ...">icon_name</span>
    pattern = r'<span([^>]*)className=["\']([^"\']*material-symbols-outlined[^"\']*)["\']([^>]*)>([^<]+)</span>'
    
    matches = list(re.finditer(pattern, content))
    if not matches:
        return False
        
    icons_to_import = set()
    new_content = content
    offset = 0
    
    for match in matches:
        full_match = match.group(0)
        attrs_before = match.group(1)
        classes = match.group(2)
        attrs_after = match.group(3)
        icon_text = match.group(4).strip()
        
        lucide = ICON_MAPPING.get(icon_text, 'Circle')
        icons_to_import.add(lucide)
        
        new_classes = classes.replace('material-symbols-outlined', '').replace('!text-xl', '').replace('!text-3xl', '').replace('!text-4xl', '').strip()
        new_classes = re.sub(r'\s+', ' ', new_classes)
        
        class_str = f' className="{new_classes}"' if new_classes else ''
        
        # reconstruct attributes preserving formatting
        # Ensure we don't duplicate spaces
        attrs = f"{attrs_before}{class_str}{attrs_after}"
        attrs = re.sub(r'\s+', ' ', attrs).strip()
        if attrs:
            attrs = " " + attrs
            
        replacement = f"<{lucide}{attrs} />"
        
        # apply replacement
        start = match.start() + offset
        end = match.end() + offset
        
        new_content = new_content[:start] + replacement + new_content[end:]
        offset += len(replacement) - len(full_match)

    # Handle imports safely
    if icons_to_import:
        import_stmt = f"import {{ {', '.join(sorted(icons_to_import))} }} from 'lucide-react';\n"
        
        # Check if lucide-react already exists
        if 'from \'lucide-react\'' in new_content or 'from "lucide-react"' in new_content:
            # We skip merging for simplicity, just warn and manual fix if duplicate is an issue
            pass
        
        # Insert after the last import
        lines = new_content.split('\n')
        last_import_idx = -1
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        
        if last_import_idx != -1:
            lines.insert(last_import_idx + 1, import_stmt.strip())
            new_content = '\n'.join(lines)
        else:
            new_content = import_stmt + new_content

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
        return True
    return False

def main():
    src_dir = 'src'
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.tsx', '.jsx')):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
