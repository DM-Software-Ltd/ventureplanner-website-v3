from django import template

register = template.Library()

@register.filter
def all_except_last_two(value):
    """Returns everything except the last two words."""
    if not value:
        return ""
    words = value.split()
    if len(words) <= 2:
        return ""
    return " ".join(words[:-2])

@register.filter
def last_two_words(value):
    """Returns only the last two words."""
    if not value:
        return ""
    words = value.split()
    if len(words) <= 2:
        return value
    return " ".join(words[-2:])