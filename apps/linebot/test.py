from constants import all_district

"""
Expect: name to be string
Expect: name length to be less or equal than 160
Return: True if valid
"""
def check_name(name):
    condition_1 = len(name) <= 160
    condition_2 = isinstance(name, str)
    return condition_1 and condition_2

"""
Expect: surnname to be string
Expect: surnname length to be less or equal than 160
Return: True if valid
"""
def check_surname(surname):
    condition_1 = len(surname) <= 160
    condition_2 = isinstance(surname, str)
    return condition_1 and condition_2

"""
Expect: surnname to be string
Expect: surnname length to be less or equal than 160
Return: True if valid
"""
def check_hospital(surname):
    condition_1 = len(surname) <= 160
    condition_2 = isinstance(surname, str)
    return condition_1 and condition_2

"""
Expect: age to be integer
Expect: age  to be more than 0 and less than 150
Return: True if valid
"""
def check_age(age):
    condition_1 = age > 0 and age < 150
    condition_2 = isinstance(age, int)
    return condition_1 and condition_2

"""
Expect: phonenumber to be string
Expect: phonenumber length to be equal 9 or equal 10
Return: True if valid
"""
def check_phonenumber(phonenumber):
    condition_1 = len(phonenumber) == 9 or len(phonenumber) == 10
    condition_2 = isinstance(phonenumber, str)
    return condition_1 and condition_2

"""
Expect: bloodtype to be string
Expect: bloodtype must be "A" or "B" or "O" or "AB"
Return: True if valid
"""
def check_bloodtype(bloodtype):
    bloodtype = bloodtype.upper()
    condition_1 = isinstance(bloodtype, str)
    condition_2 = bloodtype == "A" or bloodtype == "B" or bloodtype == "O" or bloodtype == "AB"
    return condition_1 and condition_2

"""
Expect: district to be string
Expect: district to be in list all_district
Return: True if valid
"""
def check_district(district):
    condition_1 = isinstance(district, str)
    condition_2 = district in all_district
    return condition_1 and condition_2

#written by Saryta Torat Bamboo 